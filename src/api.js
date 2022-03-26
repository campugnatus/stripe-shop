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

let ws
let subs = {}

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

	async subscribe (bucket, id, callback) {
		await ensureSocket()

		const subName = `${bucket}/${id}`

		if (subs[subName]) {
			// already subscribed
			// TODO: is there a better place for this logic?
			console.log("already subscribed:", bucket, id)
			return
		}

		subs[subName] = callback

		ws.send(JSON.stringify({
			tag: "subscribe",
			bucket,
			id
		}))

		ws.addEventListener('message', ({data}) => {
			let msg = JSON.parse(data)
			if (msg.bucket === bucket && msg.id === id) {
				callback(msg.object)
			}
		})
	},

	async createOrder ({email, items, price, paymentToken}) {
		return axios.post("/orders", {email, items, price, paymentToken})
					.then(response => response.data)
	}
}

async function ensureSocket () {
	if (ws?.readyState === 1 /* OPEN */)
		return Promise.resolve()

	// with us having a new socket, the server has also lost track of
	// us, so it makes sense to forget of all our past subscriptions
	subs = {}

	return new Promise ((resolve, reject) => {
		ws = new WebSocket(`ws://localhost:3002/subscribe`)
		ws.addEventListener('error', m => reject())
		ws.addEventListener('open', m => resolve())

		// ws.addEventListener('message', ({data}) => {
		// 	let msg = JSON.parse(data)
		// 	let subName = `${msg.bucket}/${msg.id}`

		// 	for (let [name, callback] of Object.entries(subs)) {
		// 		if (name === subName)
		// 			callback(msg.object)
		// 	}
		// })
	})

}