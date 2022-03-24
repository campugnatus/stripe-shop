<template>
	<ShopHeader/>

	<main class="grid grid-cols-2 max-w-screen-lg mx-auto px-4 sm:px-6 mt-20 lg:mt-32" :class="{loading}">
		<section class="pr-6">
			<header class="font-mono">
				<h1 class="text-3xl">Order details</h1>

				<div class="grid grid-cols-2 mt-4">
					<div>Order ID:</div>          <div>{{orderId}}</div>
					<div>Deliver to:</div>  <div :class="{'grayout': loading}">{{order?.email}}</div>
					<div>Total price:</div> <div :class="{'grayout w-16': loading}">${{order?.price}}</div>
					<div class="py-4">
						<a :href="packageURL" v-if="packageURL"
						   class="loading:grayout inline-block px-2 py-1 bg-primary text-white rounded">
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

		<section class="pl-6">
			<div class="relative">
				<ul class="space-y-6" :class="{'grayout h-64 w-full': loading}">
					<li v-for="upd, i in history" class="flex items-center">
						<!-- <CheckCircleIcon class="w-8 text-gray-300"/> -->

						<div class="ml-4 text-xs uppercase p-1 px-3 rounded-full"
						      :class="[i === 0 ? 'bg-blue-300 text-white': 'bg-gray-100 text-gray-500']">
							{{upd.status}}
						</div>
						<div class="ml-3 text-sm text-gray-400">
							{{ new Date(upd.date).toLocaleString() }}
						</div>
					</li>
				</ul>
			</div>
		</section>
	</main>

	<section class="mt-40 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
		<h1 class="text-2xl md:text-3xl font-roboto">Now... how about these?</h1>
		<Carousel class="mt-6 -mx-4" :ids="productStore.collection('recommended')"/>
	</section>

	<ShopFooter/>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import OrderedItem from '@/components/OrderedItem.vue'
import Carousel from '@/components/Carousel.vue'
import {useTitle} from '@vueuse/core'
import {CheckCircleIcon} from '@heroicons/vue/solid'
import { useProductStore } from '@/stores/products'
import api from '@/api.js'

const productStore = useProductStore()

const title = useTitle("Order details", { titleTemplate: '%s | Stripe shop' })

import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const orderId = computed(() => route.params.id)
const order = computed(() => userStore.orders[orderId.value])
const loading = computed(() => order.value === undefined)
const history = computed(() => order.value?.status.reverse())

userStore.fetchOrder(orderId)

const packageURL = computed(() => {
	// TODO: make api address configurable
	if (order.value?.package)
		return 'http://localhost:3002/package/' + order.value?.package
	else
		return undefined
})
</script>