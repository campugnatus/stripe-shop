import { createApp } from 'vue'
import './index.css'
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


const app = createApp(App)

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

window.log = function () {
	console.log(...arguments)
}

window.str = function (a) {
	return JSON.stringify(a, null, 4)
}

window.assert = function (cond, msg = "Assertion failed") {
	if (!cond)
		throw new Error(msg)
}


// A simple wrapper directive around the intersection observer API. Takes a method as
// an argument, which is supposed to be called when the given element
// intersects the viewport.
// TODO: put it in its own file

const observers = {};
app.directive('intersect', {
  
  mounted(el, binding) {
	observers[el] = new IntersectionObserver(function ([evt]) {
		if (evt.isIntersecting) {
			binding.value();
		}
	});	
  	observers[el].observe(el);
  },
  
  unmounted(el) {
  	if (observers[el]) {
  		observers[el].disconnect();
  		delete observers[el];
  	}
  }
});

app.use(router)
app.use(createPinia())
app.use(ToastPlugin)
app.mount('#app')

// const productStore = useProductStore()

// prefetch a page just in case... or should we?
//productStore.search({reset: true, append: false})

async function init () {
	await useUserStore().init()
	await useCartStore().init()
}

init()
