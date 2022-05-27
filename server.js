const express = require('express')
const app = express()
const ws = require('express-ws')(app)
const cors = require('cors')
const port = 3002
const axios = require('axios')
const jose = require('jose')

const { createProxyMiddleware } = require('http-proxy-middleware')

const { exec, spawn } = require('child_process')
const path = require('path')
const crypto = require('crypto')

const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')


const secret = 'This should be taken from somewhere like an environment variable'
const secret24 = crypto.scryptSync(secret, 'salt', 24)

const nodemailer = require("nodemailer")

const emailTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4544d25b466838",
    pass: "02bad9670588c0"
  }
})

const api = express.Router()
api.use(cookieParser())
api.use(cookieSession({ secret: 'this is added to git, how secret can it be?' }))



api.use(function authorize (req, res, next) {
	const userId = req.session.user

	if (userId) {
		const user = db.users[userId]
		if (!user)
			req.session = null
		else
			req.user = user
	}

	next()
})


api.use(express.json())

// api.use(cors({
// 	// origin: "*", // TODO: restrict only to my domains?
// 	origin: "http://localhost:3000",
// 	credentials: true
// }))

const google_client_id = "464350742513-rv3421qgq91ugsn72g1busodgehjol0p.apps.googleusercontent.com";

const db = mockDB()

function dbPut (bucket, id, object) {
	broadcast({bucket, id, object})
	db[bucket+'s'][id] = object
}


const subscribers = {
	order: {},
}

api.ws('/subscribe', (ws, req) => {
	ws.on('message', function message (m) {
		const {tag, bucket, id} = JSON.parse(m)
		if (tag === "subscribe") {
			if (!subscribers[bucket][id]) subscribers[bucket][id] = []
			subscribers[bucket][id].push(ws)
		}
	})
})

function broadcast ({bucket, id, object}) {
	if (!subscribers[bucket])
		return

	let socks = subscribers[bucket][id]

	if (!socks)
		// got off easy
		return

	socks = socks.filter(ws => ws.readyState === 1)
	subscribers[bucket][id] = socks

	for (let ws of socks) {
		ws.send(JSON.stringify({bucket, id, object}))
	}
}





app.use(function logResuests (req, res, next) {
	console.log(req.method, req.url, req.query)
	next()
})

api.use(function delay (req, res, next) {
	// simulate network delay during development for the obviousness of the
	// loading states
	setTimeout(() => {
		next()
	}, 2000)
})


api.get('/products/search/', function (req, res, next) {
	// TODO: validate parameters


	const query = {
		words:   wordify(req.query.text) || [],
		from:    req.query.from          || 0,
		to:      req.query.to            || 30,
		sort:    req.query.sort          || "default",
		colors:  req.query.color         || [],
		shapes:  req.query.shape         || [],
		number:  req.query.number        || [],
		tags:    req.query.tags          || []
	}

	const filtered = filterProducts(query, Object.values(db.products))
	const sorted = sortProducts(filtered, query.sort)
	const sliced = sorted.slice(query.from, query.to)

	res.json({
		order:    sliced.map(p => p.id),
		products: sliced.reduce((acc, p) => {acc[p.id] = p; return acc}, {}),
		more: query.to < sorted.length
	})




	function wordify(string) {
		if (!string) return undefined
		return string.split(/\s+/)
	}

	function filterProducts(query, products) {
		return products.filter(product => {
			return    matchWords(product, query.words)
			       && matchColor(product, query.colors)
			       && matchNumber(product, query.number)
			       && matchShape(product, query.shapes)
			       && matchTags(product, query.tags)
		})
	}

	function matchWords(product, words) {
		const string = JSON.stringify(product)

		for (let word of words) {
			if (!string.match(new RegExp(word, 'i'))) {
				return false
			}
		}
		return true
	}

	function matchColor(product, colors) {
		return matchTagsOR(product, colors)
	}

	function matchShape(product, shapes) {
		return matchTagsOR(product, shapes)
	}

	function matchNumber (product, numbers) {
		return matchTagsOR(product, numbers)
	}

	function matchTags(product, tags) {
		return matchTagsAND(product, tags)
	}

	function matchTagsAND (product, tags) {
		let verdict = true

		for (let tag of tags)
			verdict = verdict && !!product.tags.find(t => t === tag)

		return verdict
	}

	function matchTagsOR (product, tags) {
		if (tags.length === 0) return true

		for (let tag of tags)
			for (let tag2 of product.tags)
				if (tag === tag2)
					return true

		return false
	}

	function sortProducts(products, order) {
		if (order === "default")
			return products

		return products.sort((a, b) => {
			if (order === "price-descend") {
				if (a.price === b.price) return 0
				if (a.price > b.price)   return -1
				if (a.price < b.price)   return 1
			}
			else if (order === "price-ascend") {
				if (a.price === b.price) return 0
				if (a.price > b.price)   return 1
				if (a.price < b.price)   return -1
			}
			else if (order === "rating-descend") {
				if (a.rating === b.rating) return 0
				if (a.rating > b.rating)   return -1
				if (a.rating < b.rating)   return 1
			}
			else {
				throw new Error ("invalid sort order")
			}
		})
	}
})




// get product by id
api.get('/products/:id', function (req, res, next) {
	if (!db.products[req.params.id])
		res.sendStatus(404)

	res.json(db.products[req.params.id])
})




// create a new order
api.post('/orders', async function (req, res, next) {
	// TODO: validate input

	const orderId = newId()
	let order = {
		id: orderId,
		price: req.body.price,
		email: req.body.email,
		items: req.body.items,
		status: [
			{
				status: "created",
				date: new Date().getTime()
			},
		]
	}

	dbPut("order", orderId, order)
	//db.orders[orderId] = order
	res.json(order)

	if (req.user) {
		req.user.orders.unshift(order.id)
		dbPut("user", req.user.id, req.user)
	}

	await new Promise((resolve, reject) => setTimeout(() => resolve(), 10000))
	order.status.push({
		status: "paid",
		date: new Date().getTime()
	})
	dbPut("order", orderId, order)

	await new Promise((resolve, reject) => setTimeout(() => resolve(), 10000))
	await packOrder(order.id)

	await new Promise((resolve, reject) => setTimeout(() => resolve(), 10000))
	await shipOrder(order.id)
})


api.get('/orders/:id', function (req, res, next) {
	let order = db.orders[req.params.id]
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


async function packOrder (id) {
	let order = db.orders[id]

	let productIds = order.items.map(item => item.productId)
	let filename = await createZip(productIds)
	order.package = filename

	order.status.push({
		status: "packed",
		date: new Date().getTime()
	})

	dbPut("order", id, order)
}


async function shipOrder (id) {
	let order = db.orders[id]

	order.status.push({
		status: "shipped",
		date: new Date().getTime()
	})
	dbPut("order", id, order)
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









api.post('/login', async function (req, res, next) {
	if (req.body.jwt)
		loginGoogle(req, res, next)
	else if (req.body.password)
		loginPassword(req, res, next)
	else
		res.status(400).send("no credentials")
})


async function loginGoogle (req, res, next) {
	//
	// Decode the JWT
	//

	// get Google's public keys
	const {data: jwks} = await axios.get("https://www.googleapis.com/oauth2/v3/certs")

	const decoded = await verifyToken(req.body.jwt, jwks.keys[0]) ||
	await verifyToken(req.body.jwt, jwks.keys[1])


	if (!decoded) {
		res.status(400).send("couldn't verify the JWT")
		return
	}

	const payload = decoded.payload

	if (payload.aud !== google_client_id) {
		res.status(400).send("bad token: client id doesn't match")
		return
	}

	//
	// get user data from the DB
	//

	const user = findUserByEmail(payload.email) || createUser({
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
	res.json(viewUser(user))
}


async function loginPassword (req, res, next) {
	const user = findUserByEmail(req.body.email)

	if (!user) {
		res.status(403).send("no user")
		return
	}

	if (!user.hash) {
		res.status(403).send("password not set")
		return
	}

	if (!checkPassword(req.body.password, user.hash)) {
		res.status(403).send("wrong password")
		return
	}

	// log the user in: set the session cookie
	req.session.user = user.id

	// send back user data
	res.json(viewUser(user))
}


async function verifyToken (jwt, jwk) {
	const googlePublicKey = await jose.importJWK(jwk)
	return await jose.jwtVerify(jwt, googlePublicKey).catch(error => {
		return undefined
	})
}


// return user or undefiend

function findUserByEmail (email) {
	return Object.values(db.users).find(user =>	user.email === email)
}


function createUser ({email, picture, name, hash}) {
	const cart = {
		id: newUuid(),
		items: []
	}
	dbPut("cart", cart.id, cart)

	const user = {
		id: newUuid(),
		cart: cart.id ,
		email,
		picture,
		name,
		hash,
	}

	dbPut("user", user.id, user)
	return user
}


function hashPassword (password) {
	password = password.normalize()

	const salt = crypto.randomBytes(16).toString("hex")
	const hash = crypto.scryptSync(password, salt, 64).toString("hex")

	return hash + "." + salt
}

function checkPassword(password, digest) {
	password = password.normalize()

	const [_, hash, salt] = digest.match(/^(.+)\.(.+)$/)
	const hash2 = crypto.scryptSync(password, salt, 64).toString("hex")

	return hash2 === hash
}

function dummyCheck () {
	crypto.scryptSync("dummy", "dumber", 64).toString("hex")
}


api.post('/logout', function (req, res, next) {
	// we can't clear the session on the client as the cookie is http-only
	// Convenient!
	req.session = null
	res.send("ok, logged out")
})




api.post('/signup', function (req, res, next) {
	const { email, name, password } = req.body

	if(findUserByEmail(email)) {
		res.status(400).send("user exists")
		return
	}

	const code = gen4LetterCode()
	console.log("email verification code:", code)
	const token = createToken({email, name, password, code})

	let info = emailTransport.sendMail({
	  from: '"Stripe Shop" <noreply@stripeshop>', // sender address
	  to: email, // list of receivers
	  subject: "Email verification", // Subject line
	  text: "Your code is "+code, // plain text body
	  // html: "<b>Hello world?</b>", // html body
	})

	res.status(200).send(token)
})


api.post('/confirm', function (req, res, next) {
	const {email, name, password, code} = decodeToken(req.body.token)
	const userCode = req.body.code

	if (userCode.toLowerCase() !== code) {
		res.status(403).send("bad code")
		return
	}

	const hash = hashPassword(password)
	const user = createUser({email, name, hash})

	// log the user in: set the session cookie
	req.session.user = user.id

	res.json(viewUser(user))
})



api.post('/request_password_reset', (req, res, next) => {
	const email = req.body.email

	if(!findUserByEmail(email)) {
		res.status(401).send("user doesn't exist")
		return
	}

	const code = gen4LetterCode()
	console.log("password reset code:", code)
	const token = createToken({email, code})

	let info = emailTransport.sendMail({
	  from: '"Stripe Shop" <noreply@stripeshop>', // sender address
	  to: email, // list of receivers
	  subject: "Password reset request", // Subject line
	  text: "Your password reset code is "+code, // plain text body
	  // html: "<b>Hello world?</b>", // html body
	})

	res.send(token)
})



api.post('/password_reset', (req, res, next) => {
	const {code, token, password} = req.body
	const {email, code: rightCode} = decodeToken(token)

	if (code !== rightCode) {
		res.status(401).send("bad code")
		return
	}

	const user = findUserByEmail(email)

	if (!user) {
		res.status(500)
		return
	}

	const hash = hashPassword(password)
	user.hash = hash
	dbPut("user", user.id, user)

	res.status(200).send("ok")
})



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




api.get('/user', async function (req, res, next) {
	if (!req.user) {
		res.send("not logged in")
		return
	}

	res.json(viewUser(req.user))
})


api.get('/userexists/:email', async function (req, res, next) {
	const user = findUserByEmail(req.params.email)
	res.send(!!user)
})







api.get('/cart', (req, res, next) => {
	if (!req.user) {
		res.status(400).send("not logged in")
		return
	}

	const cart = db.carts[req.user.cart]

	res.json(cart.items)
})


api.post('/cart', (req, res, next) => {
	if (!req.user) {
		res.status(400).send("not logged in")
		return
	}

	const cart = db.carts[req.user.cart]
	cart.items = req.body.items

	dbPut("cart", req.user.cart, cart)

	res.send("ok")
})







function newId () {
	return new Date().getTime().toString().substr() + '-' + Math.random().toString().substr(-4)
}


// this one is different from newId() in that it's supposed to be harder to
// read, but harder to guess

function newUuid () {
	const secret = 'abcdefgh'
	let buf = Float64Array.from([Math.random(), Math.random(),
		                           Math.random(), Math.random()])
	const hash = crypto.createHmac('sha256', secret)
	               .update(buf)
	               .digest('hex')
	               .substr(0, 32)
	return hash
}

function getProducts () {
	let list = require('./stripes.json')
	let res = {}
	for (let prod of list) {
		res[prod.id] = prod
	}
	return res
}

function mockDB () {
	return {
		products: getProducts(),
		carts: {},
		users: {},
		orders: {
			"1644421018974-7259": {
				id: "192874ypriwuhefj",
				email: "zhopa@zhopa.zhopa",
				//package: "MC44MTA1NDU1NTQ2Mjc4",
				price: 10.5,
				status: [
				{
					status: "created",
					date: 1644412815,
				},
				{
					status: "paid",
					date: 1644414815,
				},
				{
					status: "shipped",
					date: 1644416815,
				},
				{
					status: "refund requested",
					date: 1644418815,
				},
				{
					status: "refunded",
					date: 1644420815,
				},
				],
				items: [
				{
					productId: "617:1384",
					price: 2.99, // frozen
					amount: 4,
				},
				{
					productId: "644:3569",
					price: 1.49,
					amount: 1
				}
				]
			}
		},
	}
}


app.use('/api', api)

app.use('*', createProxyMiddleware({
	// TODO: in prod, serve static files from here
	target: 'http://localhost:3000', // vite endpoint, with HMR and all
}))


app.listen(port, () => {
  console.log(`Stripe shop listening on port ${port}`)
})


function viewUser (user, view) {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		picture: user.picture,
		orders: user.orders,
		cart: user.cart
	}
}