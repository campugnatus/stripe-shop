import { defineStore } from 'pinia'
import api from '@/api.js'

// make it multiple of 12 so that it spans nicely across 2, 3 or 4 columns
const PAGE_SIZE = 12*2

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
		},

		searching: false
	}),

	getters: {
		nproducts: (state) => Object.keys(state.products).length
	},

	actions: {
		async fetchProduct (id) {
			assert(id)

			if (this.products[id]) 
				return this.products[id]

			let product = await api.fetchProduct(id)
			this.products[id] = product
			return product
		},

		/*
			1. Do we allow multiple simultaneous searches?
				* Currently, NO
				* Cuz it's much easier to implement, BUT
				* If we trigger the search automatically every time the user
				  changes the filters, the interface becomes unresponsive
				  after every user interaction. That isn't great

		  	2. Do we show "loading" state while loading new data, or just
		  	   keep the old data in the meantime?

		  		* We'll have to show loading state on the first fetch, anyway
	  	   			* Actually, not necessarily: we might prefetch
		*/

		async search ({reset, append}) {
			assert(reset !== undefined)
			assert(append !== undefined)

			if (this.searching) {
				log("refusing to start a search while another search is in progress")
				return
			}

			this.searching = true

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
				// leave a spot for the 'load more' button on the first page.
				// On the subsequent pages, don't (as we only have one of
				// those). Of course, the store has no business knowing about
				// this stuff, so uh... I'm sorry
				to: this.order.length + PAGE_SIZE - (this.order.length ? 0 : 1),
				filters: this.filters,
				sort: this.sort,
			}

			let {order, products} = await api.searchProducts(query)

			this.searching = false

			this.order = [...this.order, ...order]
			this.products = Object.assign(this.products, products)
		},
	}
})