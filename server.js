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

// get product by id
app.get('/products/all', function (req, res, next) {
	res.json(require('./stripes.json'))
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

function mockDB () {
	return {
	/* TODO: should this be keyval?
	 	- well, it'll make it easier to retrieve one-by-one
	 	- but then how do you retrieve them in bulk? */
	 	products: require('./stripes.json'),
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