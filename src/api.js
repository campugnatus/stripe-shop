import axios from "axios"

// TODO: get this from an ENV variable or somethin 
axios.defaults.baseURL = "http://localhost:3002"

// for debugging purposes, TODO: turn off in production
window.axios = axios

 let controller

import products from '/stripes.json'

export default {
	async fetchProduct (id) {
		return axios('/products/' + id)
		       .then(response => response.data)
	},

	async searchProducts (query) {
		controller = new AbortController()
		// return axios('/products/search', {
		// 	params: query,
		// 	signal: controller.signal
		// })
		// .then(response => response.data)

		for (let key of Object.keys(query)) {
			if (query[key] === undefined) {
				log("key undefined", key)
				delete query[key]
			}
		}

		const response = await fetch('http://localhost:3002/products/search?' + new URLSearchParams(query), {
			signal: controller.signal
		})

		const json = await response.json()
		log("response", response, json)
		return json
	},
	
	abortSearch () {
		controller.abort()
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