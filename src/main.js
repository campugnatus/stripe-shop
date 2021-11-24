import { createApp } from 'vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Cart from './Cart.vue'
import Front from './Front.vue'
import Product from './Product.vue'
import Catalogue from './Catalogue.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Front },
		{ path: '/catalogue', component: Catalogue },
		{ path: '/product/:id', component: Product },
		{ path: '/cart', component: Cart },
	]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
