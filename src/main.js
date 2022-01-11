import { createApp } from 'vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Cart from './Cart.vue'
import Front from './Front.vue'
import Product from './Product.vue'
import Catalogue from './Catalogue.vue'

// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);


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

const app = createApp(App)


  // gsap.to(".govno", {
  //   x: 900,
  //   duration: 6,
  //   scrollTrigger: {
  //     preventOverlaps: true,
  //     trigger: ".trigger1",
  //   }
  // });

  // gsap.to(".govno", {
  //   y: 600,
  //   duration: 6,
  //   scrollTrigger: {
  //     preventOverlaps: true,
  //     trigger: ".trigger2",
  //   }
  // });



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
app.mount('#app')
