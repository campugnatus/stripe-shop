import { defineStore } from 'pinia'
import api from '@/api.js'

// make it multiple of 12 so that it spans nicely across 2, 3 or 4 columns
const PAGE_SIZE = 12*2

export const useProductStore = defineStore('products', {
	state: () => ({
		products: {},  // id => product
		collections: {},
		order: [],     // ids
		
		query: {
			text: undefined,
			sort: "default",
			filters: {
				mono: undefined,
				color: undefined,
				shape: undefined,
				tags: []
			}
		},

		more: true,       // true= show the 'load more' button as there IS more!
		lastQuery: "",    // the previous search query, stringified
		searching: false, // true= search in progress

		// true= while searching, the user asked for another search, which
		// should be started right after the current one finishes
		searchAgain: false,
	}),

	getters: {
		nproducts: (state) => Object.keys(state.products).length,
		priceFmt: (state) => (id) => state.products[id]
		                             ? Number(state.products[id].price).toFixed(2)
		                             : undefined,
		collection: (state) => (name) => {
			if (state.collections[name])
				return state.collections[name]
			else {
				state.fetchCollection(name)
				return undefined
			}
		}
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

		async fetchCollection (name) {
			const collection = await new Promise((resolve, reject) => {
				setTimeout(() => {
					if (name === 'recommended') {
						resolve(["644:2297", "644:2289", "644:2273", "644:2761",
						         "644:2633", "644:2305", "644:2244", "561:2042",
						         "644:2313", "644:2265", "644:2377", "644:2753"])
					}
					else if (name === '1') {
						resolve(["644:2409", "644:2425", "644:2441", "644:2449",
							     "644:2465", "644:2473", "644:2505", "644:2513",
							     "644:2537", "644:2545", "644:2497", "644:2897"])
					}
					else if (name === '2') {
						resolve(["644:2577", "644:2585", "644:2593", "644:2617",
						         "644:2761", "644:2633", "644:2657", "644:2665",
						         "644:2673", "644:2705", "644:2713", "644:2721"])
					}
					else if (name === '3') {
						resolve(["644:2617", "644:2761", "644:2633", "644:2641",
							     "644:2649", "644:2657", "644:2665", "644:2673",
							     "644:2681", "644:2689", "644:2697", "644:2705"])
					}
					else reject("no such collection")
				}, 1500)
			})

			this.collections[name] = collection
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
				// queue the search to do it after the current one finishes
				this.searchAgain = arguments
				return
			}

			if (reset)
				this.filters = {
					mono: undefined,
					color: undefined,
					shape: undefined,
					tags: []
				}

			let lorder = append? this.order.length : 0

			let query = {
				query: this.query.text,
				from: lorder,
				// leave a spot for the 'load more' button on the first page.
				// On the subsequent pages, don't (as we only have one of
				// those). Of course, the store has no business knowing about
				// this stuff, so uh... I'm sorry
				to: lorder + PAGE_SIZE - (lorder ? 0 : 1),
				filters: this.filters,
				sort: this.query.sort,
			}

			if (JSON.stringify(query) == this.lastQuery) {
				log("not going to repeat the same search twice")
				return
			}

			this.searching = true

			if (!append)
				this.order = []

			this.lastQuery = JSON.stringify(query)

			let {order, products, more} = await api.searchProducts(query)

			this.searching = false
			this.order = [...this.order, ...order]
			this.products = Object.assign(this.products, products)
			this.more = more

			if (this.searchAgain) {
				this.search(...this.searchAgain)
				this.searchAgain = false
			}
		},
	}
})