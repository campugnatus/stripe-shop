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
		signedIn: (state) => !!state.profile?.id,
		shortName: (state) => state.profile.name?.split(" ")[0]
	},

	actions: {
		async init () {
			const user = await api.fetchUser()
			if (!user.id) return

			this.profile = {
				id: user.id,
				name: user.name,
				email: user.email,
				picture: user.picture
			}
		},
		async login ({jwt, email, password}) {
			const user = await api.login({jwt, email, password})
			if (!user) return

			this.profile = {
				id: user.id,
				name: user.name,
				email: user.email,
				picture: user.picture
			}
		},
		async logout () {
			await api.logout()
			this.profile = null
		},
		async signup ({email, name, password}) {
			const user = await api.signup({email, name, password})
			this.profile = {
				id: user.id,
				name: user.name,
				email: user.email,
				picture: user.picture
			}
		},
		async fetchOrder (idRef, {subscribe}) {
			let id = unref(idRef)

			if (subscribe) {
				api.subscribe("order", id, obj => {
					this.orders[id] = obj
				})
			}

			if (this.orders[id])
				return Promise.resolve(this.orders[id])

			this.orders[id] = await api.fetchOrder(id)
			return this.orders[id]
		},

	}
})