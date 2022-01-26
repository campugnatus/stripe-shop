<template>
	<ShopHeader/>

	<main class="mx-auto mt-20 lg:mt-32 grid md:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-6" v-if="product">
		<div class="flex flex-col md:items-end">
			<img :src="'/svg/'+product.filename" class="w-full max-w-[400px]" />
		</div>

		<div class="min-h-full w-full  flex flex-col max-w-[400px]">
			<h1 class="text-2xl sm:text-4xl font-roboto">{{product.title}}</h1>

			<div class="flex gap-2 mt-2">
				<RatingStars :rating="product.rating"/>
				<div class="text-gray-500 ml-2">16 ratings</div>
			</div>

			<div class="text-3xl mt-3 mb-4 font-roboto">
				${{product.price}}
			</div>

			<div class="mt-auto">
				{{product.description}}
			</div>

			<div class="mt-3 mb-6">
				<span v-for="tag in product.tags" 
				      class="text-sm p-1 px-2 border- bg-gray-200 text-primary rounded mr-2 text-gray-600">
					{{tag}}
				</span>
			</div>

			<div class="mt-auto text-lg">
				<span class="text-2xl font-bold">5</span> left in stock
			</div>

			<AddToCartButton :pid="productId" class="sm:w-64 mt-2 text-lg"/>
		</div>
	</main>

	<section class="max-w-screen-xl mx-auto mt-32 px-4 sm:px-6" v-if="product">
		<h1 class="text-2xl sm:text-3xl">User reviews</h1>

		<div class="flex gap-2 items-center mt-4">
			<RatingStars :rating="product.rating" class="h-8"/>
			<div class="text-2xl md:text-3xl font-bold ml-6 font-roboto">
				{{product.rating}}
			</div>
			<div class="ml-4 sm:hidden text-gray-500">
				16 ratings
			</div>
			<div class="ml-6 hidden sm:block text-lg text-gray-500">
				based on 16 user ratings
			</div>
		</div>

		<div class="lg:grid lg:grid-cols-2 gap-6 mt-8 -mx-4 sm:mx-0">
			<div class="space-y-6">
				<UserComment username=""/>
				<UserComment username=""/>
				<UserComment username=""/>
			</div>

			<div class="mt-6 lg:mt-0 space-y-6">
				<UserComment username=""/>
				<UserComment username=""/>
				<UserComment username=""/>
				<UserComment username=""/>
			</div>
		</div>

		<h1 class="text-3xl sm:text-4xl mt-32 font-roboto">You may also like</h1>
		<Carousel class="mt-6 -mx-4"/>
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

const productId = route.params.id
const product = computed(() => productStore.getProductById(productId))
</script>

<style>
</style>