import { defineStore } from 'pinia'
import api from '@/api.js'

export const useProductStore = defineStore('products', {
	state: () => ({
		products: {},  // id => product
		collections: {},
		order: [],     // ids

		more: true,       // true= show the 'load more' button as there IS more!
		lastQuery: "",    // the last search query, stringified
		searching: false, // true= search in progress
		appending: false, // true= same as 'searching', but indicative of whether the current order is going to be invalidated as a result. This is used for displaying the
		searchPromise: null     // search API request promise (for the sake of aborting it)
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
	  	   			* Actually, not necessarily: we might prefetch server-side)
		*/

		async search (query) {

			if (this.searching) {
				api.abortSearch()

				this.searchPromise.then(() => {
					this.search(query)
				})

				return
			}

			if (JSON.stringify(query) == this.lastQuery) {
				log("not going to repeat the same search twice")
				return
			}

			this.lastQuery = JSON.stringify(query)
			this.searching = true
			this.appending = query.append ? true : false

			this.searchPromise = api.searchProducts(query)
				.then(res => {
					let {order, products, more} = res
					this.order = query.append ? [...this.order, ...order] : order
					this.products = Object.assign(this.products, products)
					this.more = more
				})
				.catch(error => {
					if (error === "abort") {
						log("search aborted")
						return // don't panic
					}
					else {
						throw error
					}

				})
				.finally(() => {
					this.searching = false
					this.appending = false
				})

			return this.searchPromise
		},
	}
})