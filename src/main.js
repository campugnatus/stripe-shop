import { createApp } from 'vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useProductStore } from '@/stores/products.js'
import { useCartStore } from '@/stores/cart.js'

import ToastPlugin from '@/plugins/toast'

import App from './App.vue'
import Cart from './views/Cart.vue'
import Front from './views/Front.vue'
import Product from './views/Product.vue'
import Order from './views/Order.vue'
import Catalogue from './views/Catalogue.vue'

const app = createApp(App)

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior (to, from, savedPosition) {
		return { top: 0 }
	},
	routes: [
		{ path: '/', component: Front },
		{ path: '/catalogue', component: Catalogue },
		{ path: '/product/:id', component: Product },
		{ path: '/order/:id', component: Order },
		{ path: '/cart', component: Cart },
	]
})

window.log = function () {
	console.log(...arguments)
}

window.assert = function (cond, msg = "Assertion failed") {
	if (!cond)
		throw new Error(msg)
}


// A simple wrapper directive around the intersection observer API. Takes a method as
// an argument, which is supposed to be called when the given element
// intersects the viewport.

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

const productStore = useProductStore()

// prefetch a page just in case... or should we?
//productStore.search({reset: true, append: false})

const cartStore = useCartStore()
cartStore.init()