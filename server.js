const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const jose = require('jose')
const logger = require('morgan')
const {parse} = require('url')
const websocket = require('ws')

const v = require('./validators.js')
const validateBody = v.validateBody
const validateQuery = v.validateQuery

const { createProxyMiddleware } = require('http-proxy-middleware')

const { exec, spawn } = require('child_process')
const path = require('path')
const crypto = require('crypto')

const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const DB = require('./db.js')

const secret = 'This should be taken from somewhere like an environment variable'
const secret24 = crypto.scryptSync(secret, 'salt', 24)

const nodemailer = require("nodemailer")




if (!process.env.SMTP_FROM) throw "SMTP_FROM environment variable undefined"
if (!process.env.SMTP_SERVER) throw "SMTP_SERVER environment variable undefined"
if (!process.env.SMTP_PORT) throw "SMTP_PORT environment variable undefined"

const nodemailerArgs = {
	host: process.env.SMTP_SERVER,
	port: process.env.SMTP_PORT || 25,
	auth: process.env.SMTP_USER && {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD
	},
	secure: false,
	tls: {
		rejectUnauthorized: false
	}
}

const emailTransport = nodemailer.createTransport(nodemailerArgs)






const api = express.Router()
api.use(cookieParser())
api.use(cookieSession({ secret: 'this is added to git, how secret can it be?' }))


app.use(logger(process.env.NODE_ENV === "development" ? "dev" : "combined"))


api.use(function authenticate (req, res, next) {
	const userId = req.session.user

	if (userId) {
		const user = DB.getUser(userId)
		if (!user)
			req.session = null // log out non-existent user
		else
			req.user = user
	}

	next()
})

function ensureAuth (req, res, next) {
	if (req.user)
		next()
	else
		res.status(401).send("not logged in")
}

api.use(express.json())


// api.use(cors({
// 	// for browser to respect the Set-Cookie header in a cross-origin request, one
// 	// must set Access-Control-Allow-Credentials
// 	//
// 	// Access-Control-Allow-Credentials isn't allowed when
// 	// Access-Control-Allow-Origin == "*",
// 	//
// 	// Chrome won't set the cookie if the domain contains a port,
// 	//
// 	// see https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests

// 	origin: "*", // TODO: restrict only to my domains?
// 	// origin: "http://localhost:3000",
// 	credentials: true
// }))

const google_client_id = "464350742513-rv3421qgq91ugsn72g1busodgehjol0p.apps.googleusercontent.com";

// api.use(function logger (req, res, next) {
// 	console.log(req.method, req.url, req.method === "GET" ? req.query : req.body)
// 	next()
// })

api.use(function delay (req, res, next) {
	// simulate network delay during development for the obviousness of the
	// loading states
	setTimeout(() => {
		next()
	}, 0)
})


// api.use((req, res, next) => {
// 	res.set('Content-Security-Policy-Report-Only', "default-src 'self' https://pay.google.com https://accounts.googlec.com; img-src *; report-uri /api/csp_report")
// 	next()
// })

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

		await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000))

		DB.orderPushStatus(order.id, "paid")

		await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000))
		await packOrder(order.id)

		await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000))
		await shipOrder(order.id, order.email)
	}
)


async function packOrder (id) {
	const order = DB.getOrder(id)
	let productIds = order.items.map(item => item.productId)
	// TODO: should this be done inside of db.js?
	let filename = await createZip(productIds)

	DB.transaction(() => {
		DB.orderPutPackage(id, filename)
		DB.orderPushStatus(id, "packed")
	})
}

// take in product ids, make an archive, return its name (without the
// extension)

async function createZip(productIds) {
	let filenames = productIds.map(id => `svg/${id}.svg`).join(' ')
	let archiveName = newUuid()

	return new Promise ((resolve, reject) => {
		exec(`zip -j zips/${archiveName}.zip ${filenames}`, (err, stdout, stderr) => {
			resolve(archiveName)
		})
	})
}


async function shipOrder (id, email) {
	if (email)
		emailTransport.sendMail({
			from: `"Stripe Shop" <${process.env.SMTP_FROM}>`, // sender address
			to: email, // list of receivers
			subject: "Thanks for your order!", // Subject line
			text: orderNotificationText(id)
		})

	DB.orderPushStatus(id, "shipped")
}


const orderNotificationText = (id) =>

`Hello!


Thank you for making a purchase in Stripe Shop!

In case you're wondering, your Order ID is ${id}

To view your order and download the ordered products, please follow the link:

${process.env.BASE_URL}/order/${id}


We hope your stripes serve you well.

If you encounter any issues with your stripes, please let us know!


Wishing you all the best,

The Stripe Shop team
which is uh... just me
`







api.get('/orders/:id', function (req, res, next) {
	const order = DB.getOrder(req.params.id)

	if (order)
		res.json(order)
	else
		res.sendStatus(404)
})

api.get('/package/:id', (req, res, next) => {
	res.sendFile(req.params.id + ".zip", {
		root: path.join(__dirname, 'zips')
	}, err => {
	})
})






api.post('/login_google',

	validateBody({
		jwt: v.jwt
	}),

	async function (req, res, next) {
		//
		// Decode the JWT
		//

		// get Google's public keys
		const {data: jwks} = await axios.get("https://www.googleapis.com/oauth2/v3/certs")

		const decoded = await verifyToken(req.body.jwt, jwks.keys[0]) ||
		await verifyToken(req.body.jwt, jwks.keys[1])


		if (!decoded) {
			res.status(400).json({jwt: "couldn't verify the JWT"})
			return
		}

		const payload = decoded.payload

		if (payload.aud !== google_client_id) {
			res.status(400).json({jwt: "bad token: client id doesn't match"})
			return
		}

		//
		// get user data from the DB
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

	// TODO: should we pose any constraints on credentials during login? Trying to
	// avoid the situation where a user had signed up with some credentials and
	// then we made the contstraints tighter, making them unable to log into
	// their(already existing) account
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

		// send back user data
		res.json(user)
	}
)






async function verifyToken (jwt, jwk) {
	const googlePublicKey = await jose.importJWK(jwk)
	return await jose.jwtVerify(jwt, googlePublicKey).catch(error => {
		return undefined
	})
}





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

		const code = gen4LetterCode()
		console.log("email verification code:", code)
		const token = createToken({email, name, password, code})

		let info = emailTransport.sendMail({
			from: `"Stripe Shop" <${process.env.SMTP_FROM}>`, // sender address
			to: email, // list of receivers
			subject: "Email verification", // Subject line
			text: "Your code is "+code, // plain text body
			// html: "<b>Hello world?</b>", // html body
		})

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

		const code = gen4LetterCode()
		console.log("password reset code:", code)
		const token = createToken({email, code})

		let info = emailTransport.sendMail({
			from: `"Stripe Shop" <${process.env.SMTP_FROM}>`, // sender address
		  to: email, // list of receivers
		  subject: "Password reset request", // Subject line
		  text: "Your password reset code is "+code, // plain text body
		  // html: "<b>Hello world?</b>", // html body
		})

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



function gen4LetterCode() {
	const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"
	let code = ""
	code += alphabet[Math.floor(Math.random()*alphabet.length)]
	code += alphabet[Math.floor(Math.random()*alphabet.length)]
	code += alphabet[Math.floor(Math.random()*alphabet.length)]
	code += alphabet[Math.floor(Math.random()*alphabet.length)]

	return code
}



function createToken (obj) {
	if (typeof obj !== 'object')
		throw "error: createToken expected an object"

	const data = {
		data: JSON.stringify(obj).normalize(),
		issued: new Date().getTime(),
		ttl: 0,
	}
	const dataString = JSON.stringify(data).normalize()

	// initialization vector for the cipher algorithm
	const iv = crypto.randomBytes(16)
	// Once we have the key and iv, we can create and use the cipher...
	const cipher = crypto.createCipheriv('aes-192-cbc', secret24, iv)

	let encrypted = ''
	cipher.setEncoding('hex')
	cipher.on('data', (chunk) => encrypted += chunk)
	// cipher.on('end', () => console.log(encrypted))
	cipher.write(dataString)
	cipher.end()

	const token = iv.toString('hex') + '.' + encrypted
	return token
}



function decodeToken (token) {
	const [_, ivhex, encrypted] = token.match(/^(.+)\.(.+)$/)
	const iv = Buffer.from(ivhex, 'hex')

	const decipher = crypto.createDecipheriv('aes-192-cbc', secret24, iv)

	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8')

	const payload = JSON.parse(decrypted)

	// TODO: check if expired

	return JSON.parse(payload.data)
}




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
		text:   v.reviewText
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






// this one is different from newId() in that it's supposed to be harder to
// read, but harder to guess
// TODO: use 'uuid' npm package

function newUuid () {
	const secret = 'abcdefgh' // TODO: secret
	let buf = Float64Array.from([Math.random(), Math.random(),
		                           Math.random(), Math.random()])
	const hash = crypto.createHmac('sha256', secret)
	               .update(buf)
	               .digest('hex')
	               .substr(0, 32)
	return hash
}





// the endpoint for posting Content Security Policy violation reports, see e.g.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#sample_violation_report
api.post('/csp_report',
	express.json({type: "application/csp-report"}),
	(req, res, next) => {
		console.log("CSP report", req.body)
		res.sendStatus(200)
	}
)





app.use('/api', api)

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

else {
	throw "invalid STATIC_SERVER environment variable"
}


const server = app.listen(API_PORT, () => {
	console.log()
	console.log(`Stripe shop API listening on port ${API_PORT}`)
	console.log(startMsg)
	console.log()
})





/*
 * Well, all this websocket stuff isn't very elegant.
 * I tried using express-ws, but it didn't work well with SSL + nginx reverse-proxy
 */

const wsServer = new websocket.Server({ noServer: true });

server.on('socket', (socket) => {

})

server.on('upgrade', (req, socket, head) => {
	wsServer.handleUpgrade(req, socket, head, socket => {
		wsServer.emit('connection', socket, req);
	});
})

wsServer.on('connection', function (socket, request) {
	const { pathname } = parse(request.url);

	if (pathname === "/api/ws/subscribe") {
		pubsubSubscribe(socket)
	}
	else if (pathname === "/api/ws/wstest") {
		socket.on('message', message => console.log(message));
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
