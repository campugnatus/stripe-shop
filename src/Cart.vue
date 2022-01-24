<template>
	<ShopHeader/>

	<main class="mx-auto mt-10 md:mt-16 lg:mt-28 max-w-screen-lg px-4 sm:px-6 lg:px-8 md:flex">
		<div class="md:w-1/2 h-full md:pr-6 lg:pr-16 py-6">
			<header class="flex justify-between">
				<h1 class="text-2xl md:text-4xl font-roboto">Cart</h1>
				<button class="flex gap-2 items-center text-gray-500" title="Clear the cart"
						@click="cart.items.length = 0">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
 					<div class="mt-1">Clear</div>
				</button>
			</header>

			<section v-if="cart.items.length === 0"
				 class="flex justify-center items-center h-28 mt-6 md:mt-10 text-xl t text-gray-400">
				Your cart is empty!
			</section>

			<section v-else class="mt-6 md:mt-10 space-y-6">
				<CartItem v-for="item in cart.items" :key="item.productId" :item="item"/>
			</section>

			<footer class="flex justify-between text-2xl md:text-3xl font-roboto mt-8 lg:mt-14">
				<div>Total</div>
				<div class="font-bold">${{total}}</div>
			</footer>
		</div>

		<div class="md:w-1/2 h-full md:pl-6 lg:pl-16 mt-6 md:mt-0 py-6 md:border-l border-primary">
			<h1 class="text-2xl md:text-4xl font-roboto">Checkout</h1>


			<div class="bg-[#E06756] p-4 rounded-xl mt-6 md:mt-10 text-sm text-white">
				<p>
					<b>Please make sure you understand what you’re paying for</b>
				</p>

				<p class="mt-4">
					This is a joke shop, but it is functional. If you checkout, you <b>will be charged</b>. You’ll get an email with a joke or two and a .zip archive containing the images of the stripes you’ve ordered, the same images that you see here on the website. 
				</p>

				<p class="mt-4">
					You aren’t buying anything useful! The only reason for you to be doing this is if you want to throw a bit of money my way cuz you like me. In which case, please continue :-)
				</p>
			</div>

			<h2 class="text-xl md:text-2xl mt-8 md:mt-14">Your email address</h2>
			<p class="text-sm mt-3">
				This email address will be used to send you the stripes you’ve ordered, and in no other way ever
			</p>
			<input type="text" name="" class="mt-3 w-full rounded border-gray-400">
			<button class="w-full bg-primary rounded text-white text-sm font-bold p-2 mt-4">G Pay</button>
			<button class="w-full bg-primary rounded text-white text-sm font-bold p-2 mt-3">Pay with Apple</button>
		</div>
	</main>

	<section class="max-w-screen-xl mx-auto mt-14 md:mt-32 px-4 sm:px-6 lg:px-8">
		<h1 class="text-2xl md:text-4xl font-roboto">You may also like</h1>
		<Carousel class="mt-6 -mx-4 sm:-mx-6 lg:-mx-8"/>
	</section>

	<ShopFooter/>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import Carousel from '@/components/Carousel.vue'
import CartItem from '@/components/CartItem.vue'

import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'

const cart = useCartStore()
const products = useProductStore()

const total = computed(() => {
	let sum = cart.items.reduce((sum, {productId, amount}) => {
		let product = products.getProductById(productId)
		return sum + amount*product.price
	}, 0)
	return sum.toFixed(2)
})
</script>

<style>
</style>