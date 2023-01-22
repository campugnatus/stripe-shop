const path = require('node:path')
const {parse} = require('node:url')
const {exec} = require('node:child_process')

const axios = require('axios')
const jose = require('jose')
const websocket = require('ws')

const express = require('express')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const logger = require('morgan')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const DB = require('./db.js')
const utils = require('./utils.js')
const emailer = require('./emailer.js')
const v = require('./validators.js')
const validateBody = v.validateBody
const validateQuery = v.validateQuery






const DEV = process.env.NODE_ENV === "development"
const PROD = process.env.NODE_ENV === "production"

const secret = process.env.SECRET
if (!secret) throw "Error: SECRET environment variable undefined"

const app = express()
const api = express.Router()
app.use('/api', api)







//
// Middleware
//

api.use(express.json())
api.use(cookieParser())
api.use(cookieSession({secret}))
app.use(logger(DEV ? "dev" : "combined"))

api.use(function authenticate (req, res, next) {
	const userId = req.session.user

	if (userId) {
		const user = DB.getUser(userId)
		if (!user) {
			// log out non-existent user
			req.session = null
		} else {
			req.user = user
		}
	}

	next()
})

// simulate network delay during development for the obviousness of loading
// states
api.use(function delay (req, res, next) {
	if (DEV) setTimeout(next, 0)
	else next()
})

// For the browser to respect the Set-Cookie header in a cross-origin request,
// one must set Access-Control-Allow-Credentials
//
// Access-Control-Allow-Credentials isn't allowed when
// Access-Control-Allow-Origin == "*",
//
// Chrome won't set the cookie if the domain contains a port, see
// https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests

// api.use(cors({
// 	origin: "*", // TODO: restrict only to my domains?
// 	// origin: "http://localhost:3000",
// 	credentials: true
// }))

function ensureAuth (req, res, next) {
	if (req.user) next()
	else res.status(401).send("not logged in")
}







//
// API
//

api.get('/products/search/',

	validateQuery({
		text: v.optional(v.all(v.string, v.maxlen(64))),
		from: v.optional(v.all(v.min(0), v.max(9999))),
		to:   v.optional(v.all(v.min(0), v.max(9999))),

		sort: v.optional(v.oneof([
			"default", "price-descend", "rating-descend", "price-ascend"
		])),

		colors: v.optional(v.tags),
		shapes: v.optional(v.tags),
		number: v.optional(v.tags),
		tags:   v.optional(v.tags)
	}),

	function (req, res, next) {
		res.json(DB.searchProducts({
			words:   req.query.text? req.query.text.replace(/[^\w\d-]/g, "") : undefined,
			from:    parseInt(req.query.from) || 0,
			to:      parseInt(req.query.to)   || 24,
			sort:    req.query.sort           || "default",
			colors:  req.query.color,
			shapes:  req.query.shape,
			number:  req.query.number,
			tags:    req.query.tags
		}))
	}
)


api.get('/products/:id', function (req, res, next) {
	const product = DB.getProduct(req.params.id)
	if (!product) res.sendStatus(404)
	res.json(product)
})


// create a new order
api.post('/orders',

	validateBody({
		price: v.price,
		email: v.optional(v.email),
		items: v.cartItems
	}),

	async function (req, res, next) {
		const order = DB.createOrder({
			userId: req.user ? req.user.id : undefined,
			email: req.body.email,
			items: req.body.items
		})

		res.json(order)

		//
		// simulate further order handling
		//
		await new Promise(resolve => setTimeout(resolve, 5000))

		DB.orderPushStatus(order.id, "paid")
		await new Promise(resolve => setTimeout(resolve, 5000))

		await DB.packOrder(order.id)
		await new Promise(resolve => setTimeout(resolve, 5000))

		// Notify the user that their order is ready
		if (email) emailer.onOrder(email, id)
		DB.orderPushStatus(id, "shipped")
	}
)


api.get('/orders/:id', function (req, res, next) {
	const order = DB.getOrder(req.params.id)
	if (order) res.json(order)
	else res.sendStatus(404)
})


api.get('/package/:id', (req, res, next) => {
	res.sendFile(req.params.id + ".zip", {
		root: path.join(__dirname, 'zips')
	}, err => {
		console.error("Couldn't send file: ", err)
	})
})


api.post('/login_google',

	validateBody({
		jwt: v.jwt
	}),

	async function (req, res, next) {
		if (!process.env.VITE_GOOGLE_CLIENT_ID) {
			console.error("Error: VITE_GOOGLE_CLIENT_ID environment variable \
				undefined")
			res.status(500).send()
			return
		}

		//
		// Decode the JWT
		//

		// get Google's public keys
		const {data: jwks} = await axios.get("https://www.googleapis.com/oauth2/v3/certs")

		// Google returns two keys, but only one of them seems to work at a
		// time. So we try decoding both and wee which works.
		const decoded =
			await verify(req.body.jwt, jwks.keys[0]) ||
			await verify(req.body.jwt, jwks.keys[1])

		async function verify (jwt, jwk) {
			const googlePublicKey = await jose.importJWK(jwk)
			return await jose.jwtVerify(jwt, googlePublicKey).catch(error => {
				return undefined
			})
		}

		if (!decoded) {
			res.status(400).json({jwt: "couldn't verify the JWT"})
			return
		}

		const payload = decoded.payload

		if (payload.aud !== process.env.VITE_GOOGLE_CLIENT_ID) {
			res.status(400).json({jwt: "Bad JWT: client id doesn't match"})
			return
		}

		//
		// Get user data from the DB
		//

		const user = DB.findUserByEmail(payload.email) || DB.createUser({
			email: payload.email,
			picture: payload.picture,
			name: payload.name
		})

		//
		// Log in
		//

		// log the user in: set the session cookie
		req.session.user = user.id

		// send back user data
		res.json(user)
	}
)


api.post('/login_password',

	// PONDER: should we pose any constraints on credentials during login?
	// Would like to avoid the situation where a user had signed up with some
	// credentials and then we made the contstraints tighter, making them
	// unable to log into their(already existing) account
	validateBody({
		email: v.email,
		password: v.all(v.defined, v.nonempty, v.maxlen(256))
	}),

	async function (req, res, next) {
		const user = DB.findUserByEmail(req.body.email)

		if (!user) {
			res.status(403).json({email: "no user"})
			return
		}

		if (!DB.userHasPassword(user.id)) {
			// could happen if the user was created the 'login with google' way
			res.status(403).json({password: "password not set"})
			return
		}

		if (!DB.userCheckPassword(user.id, req.body.password)) {
			res.status(403).json({password: "wrong password"})
			return
		}

		// log the user in: set the session cookie
		req.session.user = user.id

		// send back the user data
		res.json(user)
	}
)


api.post('/logout', function (req, res, next) {
	// we can't clear the session on the client as the cookie is http-only
	// Convenient!
	req.session = null
	res.send("ok, logged out")
})


api.post('/signup',

	validateBody({
		email: v.email,
		name: v.username,
		password: v.password,
		confirm: v.defined,
	}),

	function (req, res, next) {
		const { email, name, password } = req.body

		if (DB.findUserByEmail(email)) {
			res.status(400).json({email: "user exists"})
			return
		}

		if (req.body.password !== req.body.confirm) {
			res.status(400).json({confirm: "no match"})
			return
		}

		const code = utils.gen4LetterCode()
		emailer.onSignup(email, code)
		DEV && console.log("email verification code:", code)
		const token = utils.createToken({email, name, password, code})

		res.status(200).send(token)
	}
)


api.post('/confirm', // TODO: rename to confirm_email for clarity sake

	validateBody({
		token: v.token,
		code: v.fourLetterCode
	}),

	(req, res, next) => {
		const {email, name, password, code} = decodeToken(req.body.token)
		const userCode = req.body.code

		if (userCode.toLowerCase() !== code) {
			res.status(403).json({code: "wrong code"})
			return
		}

		const user = DB.createUser({email, name, password})

		// log the user in: set the session cookie
		req.session.user = user.id

		res.json(user)
	}
)



api.post('/request_password_reset',

	validateBody({
		email: v.email,
	}),

	(req, res, next) => {
		const email = req.body.email

		if(!DB.findUserByEmail(email)) {
			res.status(401).json({email: "no user"})
			return
		}

		const code = utils.gen4LetterCode()
		emailer.onPasswordResetRequest(email, code)
		DEV && console.log("password reset code:", code)
		const token = utils.createToken({email, code})

		res.send(token)
	}
)


api.post('/password_reset',

	validateBody({
		code: v.fourLetterCode,
		token: v.token,
		password: v.password,
		confirm: v.defined,
	}),

	(req, res, next) => {
		const {code, token, password} = req.body
		const {email, code: rightCode} = decodeToken(token)

		if (code !== rightCode) {
			res.status(401).json({code: "wrong code"})
			return
		}
		if (req.body.password !== req.body.confirm) {
			res.status(400).json({confirm: "no match"})
			return
		}

		const user = DB.findUserByEmail(email)

		if (!user) {
			res.status(500) // this shouldn't happen
			return
		}
		DB.userSetPassword(user.id, password)
		res.status(200).send("ok")
	}
)


api.get('/user', ensureAuth, async function (req, res, next) {
	res.json(req.user)
})


api.get('/cart', ensureAuth, (req, res, next) => {
	const cart = DB.getUserCart(req.user.id)
	res.json(cart.items)
})


api.post('/cart',

	ensureAuth,

	validateBody({
		items: v.cartItems
	}),

	(req, res, next) => {
		DB.saveCart(req.user.id, req.body.items)
		res.send("ok")
	}
)


api.post('/reviews',

	ensureAuth,

	validateBody({
		id:     v.productId,
		rating: v.reviewRating,
		text:   v.optional(v.reviewText)
	}),

	(req, res, next) => {
		DB.saveReview(req.body.id, req.user.id, req.body.rating, req.body.text)

		res.json({
			product: DB.getProduct(req.body.id),
			reviews: DB.getReviews(req.body.id)
		})
	}
)


api.get("/reviews/:id", (req, res, next) => {
	// we don't expect too many reviews per product, so we're sending them all
	res.json(DB.getReviews(req.params.id))
})


// the endpoint for posting Content Security Policy violation reports, see e.g.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#sample_violation_report
api.post('/csp_report',
	express.json({type: "application/csp-report"}),
	(req, res, next) => {
		console.log("CSP report", req.body)
		res.sendStatus(200)
	}
)








//
// Pub Sub
//

// All this websocket stuff isn't very elegant. I tried using express-ws, but
// it didn't work well with SSL + nginx reverse-proxy

const wsServer = new websocket.Server({ noServer: true });

wsServer.on('connection', function (socket, request) {
	const { pathname } = parse(request.url);

	if (pathname === "/api/ws/subscribe") {
		pubsubSubscribe(socket)
	}
	else if (pathname === "/api/ws/wstest") {
		DEV && socket.on('message', message => console.log(message));
	}
	else {
		// TODO: how do I return a 404 to the user here?
		socket.terminate()
	}
});

function pubsubSubscribe (socket) {
	socket.on('message', function message (m) {
		const {tag, bucket, id} = JSON.parse(m)
		if (tag !== "subscribe") return

		DB.subscribe(bucket, id, function (object) {
			if (socket.readyState !== 1) return "unsubscribe"
			socket.send(JSON.stringify({bucket, id, object}))
		})
	})
}





//
// Start the server
//

// During development, we serve everything from here, proxying static requests
// to vite, thus getting hot module reloading and all. In production, it's the
// other way around: we serve everything with nginx, proxying api calls here.
//
// As to WHY this is so convoluted... I dunno really, why is it always like
// that? Seriously, though...
//
// * Trying to avoid dealing with CORS (kinda complicated when you're trying to
//   do authentication) makes us place both APP and API on the same server. See
//   https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests
// * You can't proxy with vite
// * In prod, it's much faster to serve static files with nginx and proxy API
//   calls to express

const APP_PORT = process.env.APP_PORT || 3000
const APP_HOST = process.env.APP_HOST || "localhost"
const API_PORT = process.env.API_PORT || 3002
const API_HOST = process.env.API_HOST || "localhost"
const STATIC_PATH = process.env.STATIC_PATH || "."

let startMsg

// one of: express, vite, nginx (hi typescript)
const STATIC_SERVER = process.env.STATIC_SERVER || (
	process.env.NODE_ENV === "production"	  ? "express" :
	process.env.NODE_ENV === "development"	? "vite" : "express"
)

//
// Serving static files ourselves
//
if (STATIC_SERVER === "express") {
	startMsg = `Serving static files from here, as well`
	app.use(express.static(path.resolve(STATIC_PATH)))
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve(STATIC_PATH, 'index.html'));
	})
}

//
// Forwarding to vite
//
else if (STATIC_SERVER === "vite") {
	startMsg = `Proxying static requests to ${APP_HOST}:${APP_PORT}`
	app.use('*', createProxyMiddleware({
		target: `http://${APP_HOST}:${APP_PORT}`
	}))
}

//
// Chilling behind a proxy
//
else if (STATIC_SERVER === "nginx") {
	// nothing for us to do
	startMsg = `Not serving static files. Are we behind a proxy?`
}

else throw "invalid STATIC_SERVER environment variable"

//
// Start the server
//
const server = app.listen(API_PORT, () => {
	console.log()
	console.log(`Stripe shop API listening on port ${API_PORT}`)
	console.log(startMsg)
	console.log()
})

//
// Connect the pubsub websocker server
//
server.on('upgrade', (req, socket, head) => {
	wsServer.handleUpgrade(req, socket, head, socket => {
		wsServer.emit('connection', socket, req);
	});
})
