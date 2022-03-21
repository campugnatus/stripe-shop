<template>
	<ShopHeader/>

	<main class="mx-auto mt-20 lg:mt-32 grid md:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-6" :class="{'loading': loading}">
		<div class="flex flex-col md:items-end">
			<div v-if="loading" class="h-full grayout" style="aspect-ratio: 1"></div>
			<img v-else :src="'/svg/'+product?.filename" class="w-full max-w-[400px]"/>
		</div>

		<div class="min-h-full w-full  flex flex-col max-w-[400px]">
			<h1 class="text-2xl sm:text-4xl font-roboto loading:grayout loading:w-full loading:h-12">{{product?.title}}</h1>

			<div class="flex gap-2 mt-2">
				<RatingStars :rating="product?.rating" class="loading:grayout"/>
				<div class="text-gray-500 ml-2 loading:grayout">16 ratings</div>
			</div>

			<div class="text-3xl mt-3 mb-4 font-roboto loading:grayout loading:w-20">
				${{price}}
			</div>

			<div class="mt-auto loading:grayout loading:h-24">
				{{product?.description}}
			</div>

			<div class="mt-3 mb-6 loading:grayout space-y-2">
				<span v-for="tag in product?.tags"
					         class="inline-block text-sm p-1 px-2 bg-gray-200 rounded mr-2 text-gray-600 whitespace-nowrap">
					{{tag}}
				</span>
			</div>

			<div class="mt-auto text-lg loading:grayout loading:w-32">
				<span class="text-2xl font-bold">5</span> left in stock
			</div>

			<AddToCartButton :pid="productId" class="sm:w-64 mt-2 text-lg loading:grayout"/>
		</div>
	</main>

	<section class="max-w-screen-xl mx-auto mt-32 px-4 sm:px-6" :class="{'loading': loading}">
		<h1 class="text-2xl sm:text-3xl">User reviews</h1>

		<div class="flex gap-2 items-center mt-4">
			<RatingStars :rating="product?.rating" class="h-8 loading:grayout"/>
			<div class="text-2xl md:text-3xl font-bold ml-6 font-roboto loading:grayout loading:w-12 loading:h-8">
				{{product?.rating}}
			</div>
			<div class="ml-4 sm:hidden text-gray-500 loading:grayout">
				16 ratings
			</div>
			<div class="ml-6 hidden sm:block text-lg text-gray-500 loading:grayout">
				based on 16 user ratings
			</div>
		</div>

		<div class="lg:grid lg:grid-cols-2 gap-6 mt-8 -mx-4 sm:mx-0">
			<div class="space-y-6">
				<UserComment username="" class="loading:grayout"/>
				<UserComment username="" class="loading:grayout"/>
			</div>

			<div class="mt-6 lg:mt-0 space-y-6">
				<UserComment username="" class="loading:grayout"/>
			</div>
		</div>

		<h1 class="text-3xl sm:text-4xl mt-32 font-roboto">You may also like</h1>
		<Carousel class="mt-6 -mx-4" :ids="productStore.collection('1')"/>
	</section>

	<ShopFooter/>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import Carousel from '@/components/Carousel.vue'
import UserComment from '@/components/UserComment.vue'
import RatingStars from '@/components/RatingStars.vue'
import AddToCartButton from '@/components/AddToCartButton.vue'

import { useProductStore } from '@/stores/products'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'


const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const productId = computed(() => route.params.id)
const product = computed(() => productStore.products[productId.value])
const loading = computed(() => product.value === undefined)
const price = computed(() => product.value? Number(product.value.price).toFixed(2) : undefined)

productStore.fetchProduct(productId.value)
</script>

<style>
</style>