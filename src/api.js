import axios from "axios"

// TODO: get this from an ENV variable or somethin 
axios.defaults.baseURL = "http://localhost:3002"

// for debugging purposes, TODO: turn off in production
window.axios = axios

// in the axios documentation they recommend the new AbortController way of
// request cancellation. However, I couldn't make it work, so I'm falling
// back to the old deprecated way
let CancelToken
let source

// just... dump them in here... for now
const sockets = []

import products from '/stripes.json'

export default {
	async fetchProduct (id) {
		return axios('/products/' + id)
		       .then(response => response.data)
	},

	async searchProducts (query) {
		CancelToken = axios.CancelToken
		source = CancelToken.source()

		return axios('/products/search', {
			params: query,
			cancelToken: source.token
		})
		.then(response => response.data, error => {
			if (axios.isCancel(error)) {
				throw "abort"
			}
			else {
				throw error
			}
		})
	},
	
	abortSearch () {
		source.cancel()
	},

	connect () {
		var s = new WebSocket('ws://localhost:3002/order/')
		s.addEventListener('error', function (m) { log("ws error"); });
		s.addEventListener('open', function (m) {
			log("websocket connection open")

		});
		s.addEventListener('message', function (m) { log("ws message", m.data); });
	},


	async login () {
		return axios({
			url: "/login",

		})
		.then(response => response.data)
	},

	async fetchOrder (id) {
		return axios(`/orders/${id}`)
		       .then(response => response.data)
	},

	subscribe (bucket, id, callback) {
		const ws = new WebSocket(`ws://localhost:3002/subscribe/${bucket}/${id}`)
		sockets.push(ws)
		ws.addEventListener('error', m => {
			log("ws error:", m)
		})
		ws.addEventListener('open', m => {
			log("ws opened:", m)
		})
		ws.addEventListener('message', m => {
			//log("ws message:", m)
			callback(JSON.parse(m.data))
		})
	},

	async createOrder ({email, items, price, paymentToken}) {
		return axios.post("/orders", {email, items, price, paymentToken})
					.then(response => response.data)
	}
}