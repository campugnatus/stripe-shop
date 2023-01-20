<template>
	<ShopHeader/>

	<div v-if="cart.empty" class="w-full h-[60vh] flex items-center justify-center">
		<div v-if="loading" class="font-pacifico text-3xl animate-pulse">Loading...</div>
		<div v-else>
			<div class="font-pacifico text-2xl">Your cart is...</div>
			<div class="font-sigmar text-4xl ml-8">
				empty
				<span class="rotate-90 inline-block">:-(</span>
			</div>
			<div v-if="cart.undoable" class="text-center mt-8" @click="cart.undo">
				<button class="bg-primary text-white rounded pb-1 px-3 pt-1.5 inline-flex hover:bg-gray-500 active:bg-black">
					<ReplyIcon class="inline h-5 mr-1"/>
					<span>Undo</span>
				</button>
			</div>
		</div>
	</div>

	<main v-else class="mx-auto mt-10 md:mt-16 lg:mt-28 max-w-screen-lg px-2 xs:px-4 sm:px-6 lg:px-8 md:flex items-stretch mb-14 md:mb-32">
		<div class="md:w-1/2 md:pr-6 lg:pr-16 py-6">
			<header class="flex justify-between items-center">
				<h1 class="text-2xl md:text-4xl font-roboto">Cart</h1>
				<button v-if="cart.undoable" class="ml-auto" @click="cart.undo">
					<ReplyIcon class="inline h-5 mr-1 mb-1"/> Undo
				</button>
				<button class="flex gap-2 items-center text-gray-500 ml-6" title="Clear the cart"
						@click="cart.clearCart">
					<TrashIcon class="inline h-5 mb-1"/> Clear
				</button>
			</header>

			<TransitionGroup tag="ul" name="items" class="mt-6 md:mt-10 relative space-y-6">
				<CartItem v-for="item in cart.items" :key="item.productId" :item="item"/>

				<footer key="footer" class="flex justify-between text-2xl md:text-3xl font-roboto pt-2 lg:pt-10">
					<div>Total</div>
					<div class="font-bold" :class="{'grayout w-20': !cart.subtotal}">$ {{cart.subtotal}}</div>
				</footer>
			</TransitionGroup>
		</div>

		<div class="md:w-1/2 md:pl-7 lg:pl-16 mt-6 md:mt-0 py-6 lg:border-l border-gray-500">
			<h1 class="text-2xl md:text-4xl font-roboto">Checkout</h1>

			<div class="bg-sky-800/40 p-4 rounded-xl mt-6 md:mt-10 text-sm text-white">
				<p>
					<b>The Google Pay button is in test mode</b>
				</p>

				<p class="mt-4">
					Which means that it looks like a real one and swims like a real one, and quacks like a real one, except that you won't get charged. There's no way for you to tell, though :-\
				</p>

				<p class="mt-4">
					So I guess you'll just have to trust me on this one...
				</p>
			</div>

			<div class="hidden bg-tomato p-4 rounded-xl mt-6 md:mt-10 text-sm text-white">
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
				This email address will be used to send you the stripes you’ve ordered, and in no other way ever.
			</p>
			<LoginInput
				focus
				v-model="form.email"
				:error="errors.email"
				class="mt-3 w-full"
				placeholder="Your email address (optional)"/>
			<GooglePayButton v-if="cart.subtotal" :price="cart.subtotal" @paid="checkout" class="mt-4"/>
		</div>
	</main>

	<section class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
		<h1 class="text-2xl md:text-4xl font-roboto">You may also like</h1>
		<Carousel class="mt-6 -mx-4 sm:-mx-6 lg:-mx-8" :ids="products.collection('recommended')"/>
	</section>

	<ShopFooter/>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import Carousel from '@/components/Carousel.vue'
import CartItem from '@/components/CartItem.vue'
import GooglePayButton from '@/components/GooglePayButton.vue'
import {   } from '@heroicons/vue/outline'
import {ReplyIcon, TrashIcon } from '@heroicons/vue/solid'
import { useRouter, useRoute } from 'vue-router'

import LoginInput from '@/components/LoginInput.vue'
import { onSubmitWrapper } from '@/utils'
// import {showToast} from '@/plugins/toast'


import { computed, ref, inject, watch, reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import { useUserStore } from '@/stores/user'

import {useTitle} from '@vueuse/core'
const title = useTitle("Cart", { titleTemplate: '%s • Stripe shop' })

const cart = useCartStore()
const products = useProductStore()
const router = useRouter()
const userStore = useUserStore()

const loading = computed(() => cart.loading)

const showToast = inject('showToast')





/**
 * Checkout
 */ 

const form = reactive({
	email: undefined
})

watch(() => userStore.profile?.email, x => {
	form.email = x || ""
}, {
	immediate: true
})

const errors = reactive({
	email: undefined
})

const checkoutLoading = ref(false)


const checkout = onSubmitWrapper({
	form,
	errors,
	loading: checkoutLoading,

	onSubmit: (paymentToken) =>
		cart.checkout({
			email: form.email,
			paymentToken
		})
		.then(orderId => {
			showToast.success("OK! Your order has been created!")
			router.push("/order/" + orderId)
		})
})
</script>







<style scoped>
.items-move,
.items-leave-active,
.items-enter-active {
		transition: all 0.3s ease;
}

.items-leave-active {
	/* ensure leaving items are taken out of layout flow so that moving
	   animations can be calculated correctly. */
   	position: absolute;
}

.items-enter-from,
.items-leave-to {
	opacity: 0;
}

.fade-leave-active,
.fade-enter-active {
	transition: all 3.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>