import axios from "axios"

export default {
	async fetchProducts () {
		return axios({
			url: "/stripes.json"
		})
		.then(response => response.data)
	}
}