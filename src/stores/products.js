import { defineStore } from 'pinia'
import api from '@/api.js'

export const useProductStore = defineStore('products', {
	state: () => ({
		all: [],
	}),

	getters: {
		getProductById (state) {
			return (id) => state.all.find(el => el.id === id)
		}
	},

	actions: {
		async fetchProducts () {
			this.all = await api.fetchProducts()
		}
	}
})