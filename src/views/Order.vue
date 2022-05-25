<template>
	<ShopHeader/>

	<div v-if="error === 404" class="h-[70vh] w-full font-pacifico text-4xl flex justify-center items-center">
		<div class="relative w-max font-sigmar">
			<div class="text-[55px] mb-2 text-tomato">404</div>
			<div class="leading-[0.8em] text-gray-700">
				<div class="">don't</div>
				<div class="tracking-widest">have</div>
				<div class="tracking-[0.14em]">that</div>
			</div>
		</div>
	</div>

	<main v-else class="mb-40 grid grid-cols-2 max-w-screen-lg mx-auto px-4 sm:px-6 mt-20 lg:mt-32" :class="{loading}">
		<section class="pr-6">
			<header class="font-mono">
				<h1 class="text-3xl">Order details</h1>

				<div class="grid grid-cols-2 mt-4">
					<div>Order ID:</div>          <div>{{orderId}}</div>
					<div>Deliver to:</div>  <div :class="{'grayout': loading}">{{order?.email}}</div>
					<div>Total price:</div> <div :class="{'grayout w-16': loading}">${{order?.price}}</div>
					<div class="py-4">
						<a
							:href="packageURL"
							v-if="packageURL"
							class="loading:grayout inline-block pr-3 pl-2.5 py-1.5 bg-primary text-white rounded">

							<DownloadIcon class="w-6 inline-block mr-2"/>
							Download .zip
						</a>
					</div>
					<div>
					</div>
				</div>
			</header>
		</section>

		<div class="mt-10 row-start-2 col-span-2">
			<h2 class="text-2xl font-mono">Order contents</h2>
			<div class="mt-3 flex flex-wrap items-center gap-x-16 gap-y-8"
			     :class="{'grayout h-20': loading}">
				<OrderedItem v-for="item in order?.items" :item="item"/>
			</div>
		</div>

		<section class="pl-6 min-h-[222px]">
			<div class="">
				<TransitionGroup tag="ul" name="hist" class="relative loading:grayout loading:h-64 loading:w-full">
					<li v-for="upd, i in updates" :key="upd.status" class="flex items-center py-2">
						<OrderStatus :status="upd"/>
						<div class="ml-3 text-sm text-gray-400" v-if="upd.date">
							{{ formatDate(upd.date) }}
						</div>
					</li>
				</TransitionGroup>
			</div>
		</section>
	</main>

	<section class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
		<h1 class="text-2xl md:text-3xl font-roboto">Now... how about these?</h1>
		<Carousel class="mt-6 -mx-4 sm:-mx-6 lg:-mx-8" :ids="productStore.collection('recommended')"/>
	</section>

	<ShopFooter/>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import OrderedItem from '@/components/OrderedItem.vue'
import OrderStatus from '@/components/OrderStatus.vue'
import Carousel from '@/components/Carousel.vue'
import {useTitle} from '@vueuse/core'
import { ref, watch, computed, reactive, isRef, watchEffect } from 'vue'
import { DownloadIcon, CheckCircleIcon} from '@heroicons/vue/solid'
import {  } from '@heroicons/vue/outline'
import { useProductStore } from '@/stores/products'
import { useUserStore, useOrderUpdates } from '@/stores/user'
import api from '@/api.js'
import {formatDate} from '@/utils'
import { useRouter, useRoute } from 'vue-router'

const productStore = useProductStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const title = useTitle("Order details", { titleTemplate: '%s | Stripe shop' })

const orderId = computed(() => route.params.id)
const order = computed(() => userStore.orders[orderId.value])
const error = ref()

userStore
	.fetchOrder(orderId.value, {subscribe: true})
	.catch(err => {
		if (err.response?.status === 404)
			error.value = 404
	})

const loading = computed(() => order.value === undefined)
const updates = useOrderUpdates(order)
const packageURL = computed(() => userStore.packageURL(orderId.value))
</script>






<style scoped>
.hist-move,
.hist-leave-active,
.hist-enter-active {
	transition: all 0.3s ease;
}

.hist-leave-active {
	/* ensure leaving items are taken out of layout flow so that moving
	   animations can be calculated correctly. */
	position: absolute;
}

.hist-enter-from,
.hist-leave-to {
	opacity: 0;
}
</style>