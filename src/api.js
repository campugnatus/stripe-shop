import axios from "axios"

// TODO: get this from an ENV variable or somethin 
axios.defaults.baseURL = "http://localhost:3002"

// for debugging purposes, TODO: turn off in production
window.axios = axios

let controller

let CancelToken
let source

import products from '/stripes.json'

export default {
	async fetchProduct (id) {
		return axios('/products/' + id)
		       .then(response => response.data)
	},

	async searchProducts (query) {
		controller = new AbortController()
		CancelToken = axios.CancelToken
		source = CancelToken.source()

		return axios('/products/search', {
			params: query,
			signal: controller.signal,
			cancelToken: source.token
		})
		.then(response => response.data, error => {
			if (axios.isCancel(error)) {
				log("search canceled the deprecated way")
				throw { name: "abort" }
			}
			else if (error.name === "AbortError") {
				log("search oborted hoho", error.name)
				throw { name: "abort" }
			}
			else {
				log("some other error")
				throw error
			}
		})

		// for (let key of Object.keys(query)) {
		// 	if (query[key] === undefined) {
		// 		log("key undefined", key)
		// 		delete query[key]
		// 	}
		// }

		// const response = await fetch('http://localhost:3002/products/search?' + new URLSearchParams(query), {
		// 	signal: controller.signal
		// })

		// const json = await response.json()
		// log("response", response, json)
		// return json
	},
	
	abortSearch () {
		controller.abort()
		source.cancel()
		// return new Promise((resolve, reject) => {
		// 	setTimeout(() => {
		// 		log("resolved")
		// 		resolve()
		// 	}, 0)
		// })
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
	}
}