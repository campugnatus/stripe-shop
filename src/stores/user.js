import { unref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api.js'

export const useUserStore = defineStore('user', {
	state: () => ({
		profile: null, /*{
			name: "Aristarkh",
			email: "zhopa@zhopa.zhopa",
			orders: [orderId, ... ]
		}*/
		orders: {
			/*
			orderId: {
				id: "192874ypriwuhefj",
				address: "zhopa@zhopa.zhopa",
				status: [
					{
						status: "refunded",,
						date: serverUnixTime,
					},
					{
						status: "refund request",
						date: serverUnixTime,
					},
					{
						status: "shipped",
						date: serverUnixTime,
					},
					{
						status: "paid",
						date: serverUnixTime,
					},
					{
						status: "created",
						date: serverUnixTime,
					}
				],
				items: [
					{
						pid: "123:345",
						amount: 4,
					}
				]
			}
			*/
		}
	}),

	getters: {
		signedIn: (state) => state.profile !== undefined,
	},

	actions: {
		async login (username, password) {
			this.profile = await api.login(username, password)
		},
		async signup ({username, name, password}) {

		},
		async fetchOrder (idRef) {
			let id = unref(idRef)
			if (this.orders[id])
				return Promise.resolve(this.orders[id])

			this.orders[id] = await api.fetchOrder(id)
		}
	}
})