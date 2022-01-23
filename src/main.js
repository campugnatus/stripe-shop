import { createApp } from 'vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useProductStore } from '@/stores/products.js'

import App from './App.vue'
import Cart from './Cart.vue'
import Front from './Front.vue'
import Product from './Product.vue'
import Catalogue from './Catalogue.vue'

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
		{ path: '/cart', component: Cart },
	]
})


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
app.mount('#app')

const productStore = useProductStore()
productStore.fetchProducts()

