const express = require('express')
const app = express()
const ws = require('express-ws')(app)
const cors = require('cors')
const port = 3002

const { createProxyMiddleware } = require('http-proxy-middleware')

const { exec, spawn } = require('child_process')
const path = require('path')
const { createHmac } = require('crypto')


app.use(express.json())

// app.use(cors({
// 	// origin: "*", // TODO: restrict only to my domains?
// 	origin: "http://localhost:3000",
// 	credentials: true
// }))


const db = mockDB()

function dbPut (bucket, id, object) {
	broadcast({bucket, id, object})
	db[bucket+'s'][id] = object
}


const subscribers = {
	order: {},
}

app.ws('/subscribe', (ws, req) => {
	ws.on('message', function message (m) {
		const {tag, bucket, id} = JSON.parse(m)
		if (tag === "subscribe") {
			if (!subscribers[bucket][id]) subscribers[bucket][id] = []
			subscribers[bucket][id].push(ws)
		}
	})
})

function broadcast ({bucket, id, object}) {
	let socks = subscribers[bucket][id]

	if (!socks)
		// got off easy
		return

	socks = socks.filter(ws => ws.readyState === 1)
	subscribers[bucket][id] = socks

	for (let ws of socks) {
		console.log("sending notification")
		ws.send(JSON.stringify({bucket, id, object}))
	}
}





app.use(function logResuests (req, res, next) {
	console.log(req.method, req.url, req.query)
	next()
})

app.use(function delay (req, res, next) {
	// simulate network delay during development for the obviousness of the
	// loading states
	setTimeout(() => {
		next()
	}, 2000)
})


app.get('/products/search/', function (req, res, next) {
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
app.get('/products/:id', function (req, res, next) {
	if (!db.products[req.params.id])
		res.sendStatus(404)

	res.json(db.products[req.params.id])
})




// create a new order
app.post('/orders', async function (req, res, next) {
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


app.get('/orders/:id', function (req, res, next) {
	let order = db.orders[req.params.id]
	if (order)
		res.json(order)
	else
		res.sendStatus(404)
})

app.get('/package/:id', (req, res, next) => {
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






app.post('/login', function (req, res, next) {

})

app.post('/signup', function (req, res, next) {

})

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })





function newId () {
	return new Date().getTime().toString().substr() + '-' + Math.random().toString().substr(-4)
}


// this one is different from newId() in that it's supposed to be harder to
// read, but harder to guess

function newUuid () {
	const secret = 'abcdefgh'
	let buf = Float64Array.from([Math.random(), Math.random(),
		                           Math.random(), Math.random()])
	const hash = createHmac('sha256', secret)
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


app.use('*', createProxyMiddleware({
	target: 'http://localhost:3000',
}))

app.listen(port, () => {
  console.log(`Stripe shop listening on port ${port}`)
})