import { defineStore } from 'pinia'
import api from '@/api.js'

// TODO: caching isn't that good for when you have multiple pages of search
// results loaded. The problem is t hat when you navigate the browser
// history, only the first page get loaded, which might lead to the scroll
// position not having been restored properly

export const useProductStore = defineStore('products', {
	state: () => ({
		products: {},  // id => product
		reviews: {},
		collections: {},
		order: [],     // ids

		cache: {}, // search query stringified -> { order, more }

		more: true,       // true= show the 'load more' button as there IS more!
		lastQuery: "",    // the last search query, stringified
		searching: false, // true= search in progress
		appending: false, // true= same as 'searching', but indicative of whether the current
		                  // order is going to be invalidated as a result. This is used for displaying
		                  //  different loading states for different cases
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

		async fetchReviews (id) {
			if (this.reviews[id])
				return

			const reviews = await api.fetchReviews(id)
			this.reviews[id] = reviews
		},

		async postReview ({id, rating, text}) {
			const {reviews, product} = await api.postReview({id, rating, text})
			this.reviews[id] = reviews
			this.products[id] = product
		},

		async fetchCollection (name) {
			const collection = await new Promise((resolve, reject) => {
				setTimeout(() => {
					if (name === 'recommended') {
						resolve(["644:3289", "644:3361", "644:3257", "644:3425", "644:3249", "644:3185", "644:2625", "644:3201", "644:3305", "644:3417", "644:3233", "644:3353"])
					}
					else if (name === '1') {
						resolve(["644:2593", "579:1077", "644:2753", "644:2897", "644:2769", "644:2841", "644:2801", "644:2809", "644:2817", "644:2825", "644:2833", "473:1036"])
					}
					else if (name === '2') {
						resolve(["644:2577", "644:2585", "644:2593", "644:2617", "644:2761", "644:2633", "644:2657", "644:2665", "644:2665", "644:2705", "644:2713", "644:2721"])
					}
					else if (name === '3') {
						resolve(["644:2617", "644:2761", "644:2633", "644:2641", "644:2649", "644:2657", "644:2665", "644:2665", "644:2681", "644:2689", "644:2697", "644:2705"])
					}
					else reject("no such collection")
				}, 1500)
			})

			this.collections[name] = collection
		},


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

			if (this.cache[this.lastQuery]) {
				log("have the search result cached, don't fetch")
				this.searchPromise = Promise.resolve(this.cache[this.lastQuery])
			} else {
				this.searchPromise = api.searchProducts(query)
					.then(({order, products, more}) => {
						this.cache[this.lastQuery] = {order, more}
						this.products = Object.assign(this.products, products)
						return {order, more}
					})
			}

			this.searchPromise = this.searchPromise
				.then(({order, more}) => {
					this.order = query.append ? [...this.order, ...order] : order
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


/**
 * State synchronization discussion.
 *
 * So, suppose the client has made some modifications to the server state.
 * Say, they've posted a review of a product. I want to display the changes.
 *
 * That includes their review itself and the updated product rating. The
 * latter is calculated on the server.
 *
 * How should I then transfer the updated state to the client?
 *
 * * Do we need to respond with the whole newly created "review" object, or
 *   just an "OK" status? The client knows the data, after all.
 *
 * 		Weeell, not in the general case. Their request contains SOME data
 * 		in it, but the server might add an arbitrary amount of stuff to
 * 		the resulting object that the clients needs to display it.
 *
 * 		SO, we send a request, and the server responds with the "review"
 * 		object. We can then add it to the list of reviews.
 *
 * * There might be some other state updates they might have caused that they
 *   might want to display, too. Specifically, the updated product rating. Do
 *   we just include it in the response to their POST?
 *
 * 		Well, that might not be enough. What if in the time they were
 * 		writing their review, some other people wrote some reviews to
 * 		the same product? In that case, the updated product rating
 * 		would no longer match the reviews they're seeing on the page
 * 		(since we haven't sent them the new ones)
 *
 * * Okay, FUCK. Should we then refetch the reviews entirely? AND the product?
 *
 * 		Maybe? But while we're fetching, should we display a loading state,
 * 		like usual, as if we had nothing to display at all? Well, that
 * 		would be weird, given that most of the time the refetched
 * 		reviews would just match the old ones, and the loading state is
 * 		disruptive.
 *
 * 		OR do we refetch silently in the background? Well, that would be OK
 * 		if the new state isn't different, but if it is - the user will
 * 		see a sudden jump when the new content loads. Not ideal.
 *
 * * Or not refetch, but send all the updated state in the response?
 *
 * 		This way we can use the "posting review" loading state. Which is a
 * 		more expected UX.
 *
 * * To refetch or not to refetch... that is the question.
 */
