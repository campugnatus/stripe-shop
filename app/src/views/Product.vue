<template>
	<ShopHeader/>

	<main class="mx-auto mt-20 lg:mt-32 grid md:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-6" :class="{'loading': loading}">
		<div class="flex flex-col md:items-end relative overflow-hidden">
			<div v-if="loading" class="h-full grayout" style="aspect-ratio: 1"></div>
			<img v-else :src="'/stripes/svg/'+product?.filename" class="w-full max-w-[400px]"/>
		</div>

		<div class="min-h-full w-full  flex flex-col max-w-[400px]">
			<h1 class="text-2xl sm:text-4xl font-roboto loading:grayout loading:w-full loading:h-12">
				{{product?.title}}
			</h1>

			<div class="flex items-center mt-2">
				<RatingStars :rating="product?.rating" class="loading:grayout h-7 shrink-0"/>
				<div class="text-gray-500 ml-4 loading:grayout">
					{{product?.nratings || 0}} {{product?.nratings == 1 ? "rating" : "ratings"}}
				</div>
			</div>

			<div class="text-3xl mt-3 mb-4 font-roboto loading:grayout loading:w-20">
				${{price}}
			</div>

			<div class="mt-auto loading:grayout loading:h-24">
				{{product?.description}}
			</div>

			<div class="mt-3 mb-6 loading:grayout space-y-2">
				<a
					:href="'/catalogue?filter='+tag"
					v-for="tag in presentableTags"
					class="inline-block product-tag">
					{{tag}}
				</a>
			</div>

			<div class="mt-auto text-lg loading:grayout loading:w-32 flex items-center">
				<span>In stock:</span>
				<span class="ml-2 text-3xl text-gray-700 font-bold">∞</span>
			</div>

			<AddToCartButton :pid="productId" class="sm:w-64 mt-2 text-lg loading:grayout"/>
		</div>
	</main>

	<section id="comments" class="max-w-screen-xl mx-auto mt-32 px-4 sm:px-6" :class="{'loading': loading}">
		<h1 class="text-2xl sm:text-3xl">User reviews</h1>

		<div class="flex items-center mt-4">
			<RatingStars :rating="product?.rating" class="h-8 loading:grayout"/>
			<div class="text-2xl md:text-3xl font-bold ml-6 font-roboto loading:grayout loading:w-20 loading:h-8">
				{{Number(product?.rating).toFixed(1)}}
			</div>
			<div class="ml-4 sm:hidden text-gray-500 loading:grayout">
				{{product?.nratings}} {{product?.nratings > 1 ? "ratings" : "rating"}}
			</div>
			<div class="ml-6 hidden sm:block text-lg text-gray-500 loading:grayout">
				based on {{product?.nratings || 0}} user {{product?.nratings == 1 ? "rating" : "ratings"}}
			</div>
		</div>

		<div v-if="loadingReviews" class="h-[50vh] flex items-center justify-center font-pacifico text-3xl animate-pulse">
			Loading reviews...
		</div>

		<div
			v-else-if="lg"
			class="lg:grid lg:grid-cols-2 gap-6 mt-8 -mx-4 sm:mx-0 mb-32">

			<div class="space-y-6">
				<NewReview :id="productId" :review="my"/>
				<UserReview v-for="review in odd" :review="review"/>
			</div>
			<div class="space-y-6">
				<UserReview v-for="review in even" :review="review"/>
			</div>
		</div>

		<div
			v-else
			class="mt-8 -mx-4 sm:mx-0 space-y-4 mb-32">
			<NewReview :id="productId" :review="my"/>
			<UserReview v-for="review in others" :review="review"/>
		</div>
	</section>

	<section class="max-w-screen-xl mx-auto px-4 sm:px-6">
		<h1 class="text-3xl sm:text-4xl font-roboto">You may also like</h1>
		<Carousel class="mt-6 -mx-4" :ids="productStore.collection('1')"/>
	</section>

	<ShopFooter/>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import NewReview from '@/components/NewReview.vue'
import Carousel from '@/components/Carousel.vue'
import UserReview from '@/components/UserReview.vue'
import RatingStars from '@/components/RatingStars.vue'
import AddToCartButton from '@/components/AddToCartButton.vue'
import { breakpointsTailwind, useBreakpoints, useTitle } from '@vueuse/core'
import { useProductStore } from '@/stores/products'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ref, watch, computed, nextTick, inject } from 'vue'
import { formatPrice } from '@/utils'

const userStore = useUserStore()
const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const breakpoints = useBreakpoints(breakpointsTailwind)
const lg = breakpoints.greater('lg')

const productId = computed(() => route.params.id)
const product = computed(() => productStore.products[productId.value])

useTitle(
	computed(() => product.value?.title || "..."),
	{ titleTemplate: inject('titleTemplate')}
)




function init (route) {
	productStore.fetchProduct(route.params.id)
	productStore.fetchReviews(route.params.id)
}

init(route)
onBeforeRouteUpdate(async (to, from) => {
	// a tricky point here is that the 'route' variable here points to the old
	// route still, and as a consequence all the computed variables have old
	// values. So we can't rely on updated values inside of this callback
	init(to)
})





const presentableTags = computed(() => product.value?.tags?.filter(function (tag) {
	if (tag.match(/^\d+$/)) return false
	return true
}))

const loadingReviews = computed(() => !productStore.reviews[productId.value])

const reviews = computed(() => productStore.reviews[productId.value] || [])
const my = computed(() => reviews.value.find(rev => rev.userId === userStore.profile?.id))
const others = computed(() => reviews.value.filter(x => x !== my.value).filter(x => x.text))
const odd = computed(() => others.value.filter((el, i) => i%2 === 1))
const even = computed(() => others.value.filter((el, i) => i%2 === 0))

const loading = computed(() => product.value === undefined)
const price =   computed(() => formatPrice(product.value?.price))

</script>

<style>
</style>