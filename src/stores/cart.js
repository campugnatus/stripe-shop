import { defineStore } from 'pinia'
import { useProductStore } from '@/stores/products'
import api from '@/api.js'

export const useCartStore = defineStore('cart', {
	state: () => ({
		// [{ productId, amount }]
		items: [],
		history: [],
		loading: true,
	}),

	getters: {
		totalAmount: (state) => state.items.reduce((sum, item) => sum + item.amount, 0),
		findItem: (state) => (id) => state.items.find(item => item.productId === id),
		empty:    (state) => state.items.length === 0,
		undoable: (state) => state.history.length > 0,
		subtotal: (state) => {
			const productStore = useProductStore()

			// if some of the products haven't been fetched yet, we'll wait...
			// and return undefined for now
			for (let item of state.items) {
				let product = productStore.products[item.productId]
				if (!product)
					return undefined
			}

			return state.items.reduce((sum, {productId, amount}) => {
				let product = productStore.products[productId]
				return sum + amount*product.price
			}, 0).toFixed(2)
		},
	},

	actions: {
		addItem(id) {
			this.history = [];
			let item = this.items.find(item => item.productId === id)
			if (item)
				// already have this item in the cart
				item.amount++
			else
				this.items.push({
					productId: id,
					amount: 1
				})
		},

		clearCart () {
			this.history.push([...this.items])
			this.items = []
		},

		undo () {
			this.items = this.history.pop()
		},

		subtractItem (id) {
			let item = this.items.find(item => item.productId === id)
			if (item) {
				if (item.amount === 1)
					this.removeItem(id)
				else {
					this.history = [];
					item.amount--
				}
			}
		},

		removeItem (id) {
			let index = this.items.findIndex(item => item.productId === id)
			if (index >= 0) {
				this.history.push([...this.items])
				this.items.splice(index, 1)
			} else
				console.error(`Cannot delete from the cart the item that isn't there in the first place (id=${id})`)
		},

		setAmount (id, amount) {
			this.history = [];

			if (amount === 0) {
				this.removeItem(id)
				return;
			}
		
			let item = this.items.find(item => item.productId === id)
			if (item) {
				item.amount = amount
			} else {
				this.addItem(id)
				this.setAmount(id, amount)
			}
		},

		async checkout ({email, paymentToken}) {
			const order = await api.createOrder({
				paymentToken,
				email,
				price: this.subtotal,
				items: this.items.map(addPrice)
			})

			// everything went fine, can clear the cart now
			this.items = []
			
			return order.id

			function addPrice(item) {
				const productStore = useProductStore()
				const product = productStore.products[item.productId]
				item.price = product.price
				return item
			}
		},

		async save () {
			localStorage.setItem('cart', JSON.stringify(this.items))
		},

		async init () {
			let savedItems = localStorage.getItem('cart')

			if (savedItems)
				this.items = JSON.parse(savedItems)
			else
				this.items = []

			this.$subscribe((mutation, state) => this.save())

			const productStore = useProductStore()
			this.items.forEach(item => productStore.fetchProduct(item.productId))
			this.loading = false
		}
	}
})