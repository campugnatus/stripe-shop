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



const wshost = "ws://localhost:3002"

// websocket for the pubsub
let ws

// we keep track of our subscriptions for the sole purpose of avoiding
// multiple subscriptions to the same object... which, theoretically, might
// not be such a bad thing, after all: different places might want to
// subscribe to the same thing for different reasons, nothing wrong with
// that. But we want to avoid the same place subscribing multiple times. Is
// there a way?
let subs = {}


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

	async createOrder ({email, items, price, paymentToken}) {
		return axios.post("/orders", {email, items, price, paymentToken})
					.then(response => response.data)
	},

	async subscribe (bucket, id, callback) {
		await ensureSocket()

		const subName = `${bucket}/${id}`

		if (subs[subName]) {
			// already subscribed
			// TODO: is there a better place for this logic?
			return
		}

		subs[subName] = callback

		ws.send(JSON.stringify({tag: "subscribe", bucket, id}))

		ws.addEventListener('message', ({data}) => {
			let msg = JSON.parse(data)
			if (msg.bucket === bucket && msg.id === id) {
				callback(msg.object)
			}
		})
	},
}

async function ensureSocket () {
	if (ws?.readyState === 1 /* OPEN */)
		return Promise.resolve()

	// with us getting a new socket, the server will also have lost track of
	// us, so it makes sense to simply forget all of our past subscriptions
	subs = {}

	return new Promise ((resolve, reject) => {
		ws = new WebSocket(`${wshost}/subscribe`)
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