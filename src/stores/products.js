import { defineStore } from 'pinia'
import api from '@/api.js'

export const useProductStore = defineStore('products', {
  state: () => ({
	all: {}
  }),

  actions: {
  	async fetchProducts () {
      this.all = await api.fetchProducts();
  	}
  }
})