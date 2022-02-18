import { defineStore } from 'pinia'
import api from '@/api.js'

const PAGE_SIZE = 30

export const useProductStore = defineStore('products', {
	state: () => ({
		products: {},  // id => product
		order: [], // ids
		
		query: "", // the text from the search box
		sort: "default",

		filters: {
			mono: undefined,
			color: undefined,
			shape: undefined,
			tags: []
		}
	}),

	getters: {
		nproducts: (state) => Object.keys(state.products).length
	},

	actions: {
		async fetchProduct (id) {
			if (this.products[id]) 
				return this.products[id]

			let product = await api.fetchProduct(id)
			this.products[id] = product
			return product
		},


		// ok ok, FUCK... so we have the following different scenarios;
		// 1. search is triggered from the search box
		//		reset filters, search from the start
		// 2. filters/sorting changed
		// 		don't reset anything, search from the start
		// 3. load MORE
		// 		don't reset anything, search from the current

		async search ({reset, append}) {
			assert(reset !== undefined)
			assert(append !== undefined)
			
			if (reset)
				this.filters = {
					mono: undefined,
					color: undefined,
					shape: undefined,
					tags: []
				}

			if (!append)
				this.order = []

			let query = {
				query: this.query,
				from: this.order.length,
				to: this.order.length + PAGE_SIZE,
				filters: this.filters,
				sort: this.sort,
			}

			let {order, products} = await api.searchProducts(query)
			this.order = [...this.order, ...order]
			this.products = Object.assign(this.products, products)
		},
	}
})