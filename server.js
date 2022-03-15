const express = require('express')
const app = express()
const cors = require('cors')
const port = 3002

app.use(express.json())

// TODO: restrict CORS
app.use(cors())

const db = mockDB()

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
		from:    req.query.from           || 0,
		to:      req.query.to             || 30,
		sort:    req.query.sort           || "default",
		colors:  req.query.color          || [],
		shapes:  req.query.shape          || []
	}

	console.log(req.query, query)

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
			return matchWords(product, query.words)
			       && matchColor(product, query.colors)
			       && matchShape(product, query.shapes)
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
		return true
	}

	function matchShape(product, shapes) {
		return true
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
app.post('/orders', function (req, res, next) {
	// TODO: validate input

	console.log("new order payment token:", req.body.paymentToken)

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
			{
				status: "waiting for payment",
				date: new Date().getTime()
			}
		]
	}
	db.orders[orderId] = order

	setTimeout(() => {
		order.status.push({
			status: "paid",
			date: new Date().getTime()
		})
		shipOrder(order.id)
	}, 5000)

	res.json(order)
})


app.get('/orders/:id', function (req, res, next) {
	let order = db.orders[req.params.id]
	if (order)
		res.json(order)
	else
		res.sendStatus(404)
})




app.post('/login', function (req, res, next) {

})

app.post('/signup', function (req, res, next) {

})

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Stripe shop listening on port ${port}`)
})








function shipOrder (id) {
	let order = db.orders[id]
	console.log("order shipped:", id)
	order.status.push({
		status: "shipped",
		date: new Date().getTime()
	})
}

function newId () {
	return new Date().getTime().toString() + '-' + Math.random().toString().substr(-4)
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