import axios from "axios"

const mockDB = {
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
};

export default {
	async fetchProducts () {
		return axios({
			url: "/stripes.json"
		})
		.then(response => response.data)
	},
	
	async login () {
		return axios({
			url: "/login",

		})
		.then(response => response.data)
	},

	async fetchOrders (ids) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let res = {}
				for (let id of ids) {
					res[id] = mockDB.orders[id]
					if (!res[id])
						reject(`Order ${id} not found`)
				}
				resolve(res)
				// TODO: fail sometimes?
			}, 1500)
		})
	},

	async createOrder ({email, items, price}) {
		const orderId = newId()
		let order = {
			id: orderId,
			status: [
				{
					status: "created",
					date: new Date().getTime()
				}
			],
			price,
			email,
			items,
		}

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (Math.random < 0.2) {
					reject("SHIT")
				} else /* everything's fine */ {
					mockDB.orders[orderId] = order
					resolve(orderId)
				}
			}, 1500)
		})
	}
}

function newId () {
	return new Date().getTime().toString() + '-' + Math.random().toString().substr(-4)
}