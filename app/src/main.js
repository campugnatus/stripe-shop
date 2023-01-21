import './index.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useProductStore } from '@/stores/products.js'
import { useCartStore } from '@/stores/cart.js'
import { useUserStore } from '@/stores/user.js'

import ToastPlugin from '@/plugins/toast'

import App from './App.vue'
import Cart from './views/Cart.vue'
import Front from './views/Front.vue'
import Product from './views/Product.vue'
import Order from './views/Order.vue'
import OrderHistory from './views/OrderHistory.vue'
import Catalogue from './views/Catalogue.vue'
import About from './views/About.vue'

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {
			return {el: to.hash }
		} else if (to.path === from.path) {
			return false
		} else if (savedPosition) {
		  return savedPosition
		} else {
		  return { top: 0 }
		}
	},
	routes: [
		{ path: '/', component: Front },
		{ path: '/catalogue', component: Catalogue },
		{ path: '/product/:id', component: Product },
		{ path: '/order/:id', component: Order },
		{ path: '/orders', component: OrderHistory },
		{ path: '/cart', component: Cart },
		{ path: '/about', component: About },
	]
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ToastPlugin)
app.mount('#app')

// to be used with useTitle from @vueuse
app.provide('titleTemplate', '%s • Stripe shop')

async function init () {
	// 'await' here is important: cart needs user to be initialized
	await useUserStore().init()
	await useCartStore().init()
}

init()
