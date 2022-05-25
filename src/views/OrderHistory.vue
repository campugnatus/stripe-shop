<template>
	<ShopHeader/>

	<main v-if="loading" class="font-pacifico text-3xl flex justify-center items-center h-[70vh]">
		<div class="animate-pulse">Loading...</div>
	</main>

	<main v-else-if="orders.length === 0" class="flex justify-center items-center h-[70vh]">
		<div>
			<span class="uppercase font-sigmar text-2xl">
				Nothing<br> here
			</span>
			<br>
			<span class="absolute text-gray-600 font-pacifico text-5xl inline-block translate-x-1 -translate-y-4">
				... yet?
			</span>
		</div>
	</main>

	<main v-else class="mb-40 max-w-screen-xl mx-auto px-4 sm:px-6 mt-20 lg:mt-32 space-y-20">
		<h1 class="text-4xl font-roboto font-bld">Order history</h1>
		<OrderCard v-for="order in orders" :order="order"/>
	</main>

	<section class="max-w-screen-xl mx-auto px-4 sm:px-6">
		<h1 class="text-2xl md:text-3xl font-roboto">Now... how about these?</h1>
		<Carousel class="mt-6 -mx-4 sm:-mx-6" :ids="productStore.collection('recommended')"/>
	</section>

	<ShopFooter/>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'

import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import OrderCard from '@/components/OrderCard.vue'
import Carousel from '@/components/Carousel.vue'
import {useTitle} from '@vueuse/core'
import {useUserStore} from '@/stores/user'
import {useProductStore} from '@/stores/products'

const title = useTitle("Order history", { titleTemplate: '%s | Stripe shop' })

const userStore = useUserStore()
const productStore = useProductStore()

const loading = computed(() => userStore.loading)
const orders = computed(() => userStore.ordersChronologically)
</script>