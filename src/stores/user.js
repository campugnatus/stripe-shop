import { ref, unref, watch, computed, watchEffect, isRef, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useCartStore } from '@/stores/cart'
import api from '@/api.js'

export const useUserStore = defineStore('user', {
	state: () => ({
		profile: null,
		orders: {},
		loading: true
	}),

	getters: {
		ordersChronologically: (state) => {
			if (!state.signedIn) return []

			return state.profile.orders
				.map(oid => state.orders[oid])
				.sort((a,b) => {
					return a.status[0].date < b.status[0].date ? 1 :
						a.status[0].date === b.status[0].date ? 0 :
						-1
				})
		},
		packageURL: (state) => (orderId) => {
			const order = state.orders[orderId]

			if (order?.package) {
				return api.baseURL+'/package/' + order.package
			} else
				return undefined
		},
		timeCreated: (state) => (orderId) => {
			const status = state.orders[orderId]?.status
			if (!status) return undefined
			return status[0].date
		},
		lastStatus: (state) => (orderId) => {
			const status = state.orders[orderId]?.status
			if (!status) return undefined
			return status[status.length-1]
		},
		signedIn: (state) => !!state.profile?.id,
		shortName: (state) => state.profile && state.profile.name.split(" ")[0],
	},

	actions: {
		async init () {
			if (this.profile)
				return

			const user = await api.fetchUser().catch(() => ({}))

			if (!user.id) {
				this.loading = false
				return
			}

			await this.setUser(user)
			this.loading = false
		},


		async setUser (user) {
			this.profile = {
				id: user.id,
				name: user.name,
				email: user.email,
				picture: user.picture,
				orders: user.orders
			}
			return Promise.all(user.orders.map(orderId => this.fetchOrder(orderId)))
		},


		async login ({jwt, email, password}) {
			this.loading = true
			const user = await api.login({jwt, email, password})
			this.loading = false
			if (!user) return

			this.setUser(user)
			useCartStore().init()
		},


		async logout () {
			await api.logout()
			useCartStore().logout()
			this.profile = null
			this.orders = {}
		},


		async signup ({email, name, password}) {
			return await api.signup({email, name, password})
			// next, the server sends the user an email with a verification code
		},


		async verifyCode (code, token) {
			this.loading = true
			const user = await api.verifyCode(code, token)
			this.loading = false
			this.setUser(user)
		},


		async createOrder ({paymentToken, email, price, items}) {
			// the server will add the newly created order to the user's account
			const order = await api.createOrder({paymentToken, email, price, items})

			if (this.signedIn) {
				// and we'll do the same on our side
				this.profile.orders.unshift(order.id)
			}

			this.orders[order.id] = order
			return order
		},


		async fetchOrder (id, options) {
			if (options?.subscribe) {
				api.subscribe("order", id, obj => {
					this.orders[id] = obj
				})
			}

			if (this.orders[id])
				// don't refetch
				return Promise.resolve(this.orders[id])

			this.orders[id] = await api.fetchOrder(id)
			return this.orders[id]
		},
	}
})


// there are some transient statuses that we don't store on the server but
// want to show to the user

// the reason why this can't be a simple computed property is that is has to
// return multiple times with a delay between them. And computed properties
// can't do that

// TODO: extract this from here?

export function useOrderUpdates (order) {

	const updates = ref([])

	watch(order, async () => {
		const o = unref(order)

		if (o === undefined) {
			updates.value = []
			return
		}

		const status = o.status
		updates.value = [...status].reverse()

		let last = updates.value[0]
		let res = [...status]

		let waitingStatus = {
			created: { status: "waiting for payment", waiting: true },
			paid:    { status: "wrapping up", waiting: true },
			packed:  { status: "preparing shipment", waiting: true },
		}

		if (!waitingStatus[last.status]) {
			// log("here?", last.status)
			return
		}

		// pause for the animation purposes
		await new Promise(resolve => setTimeout(() => resolve(), 800))

		res.push(reactive(waitingStatus[last.status]))
		updates.value = res.reverse()
		// log("updates", JSON.stringify(updates, null, 4))
	}, {
		immediate: true,
		deep: true
	})

	return updates
}