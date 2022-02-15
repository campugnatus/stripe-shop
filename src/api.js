import axios from "axios"


// TODO: get this from an ENV variable or somethin 
axios.defaults.baseURL = "http://192.168.58.23:3002"


import products from '/stripes.json'

export default {
	async fetchProducts () {
		return axios('/products/all').then(response => response.data)
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

	async createOrder ({email, items, price}) {
		return axios.post("/orders", {email, items, price})
					.then(response => response.data)
	}
}