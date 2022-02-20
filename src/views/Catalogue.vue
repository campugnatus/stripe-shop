<template>
	<ShopHeader :text="productStore.query.text"/>

	<section class="sm:container lg:hidden w-80 mx-auto px-3 md:px-6 mt-32 mb-5 flex justify-between">
		<div>
			<label class="mr-4 hidden sm:inline">Sort by:</label>
			<select class="bg-white border px-2 py-1 rounded border-gray-400">
				<option value="default">Default</option>
				<option value="rating-descend">Highest rated first</option>
				<option value="price-ascend">Cheapest first</option>
				<option value="price-descend">Most expensive first</option>
			</select>
		</div>
		<button class="flex items-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
			</svg>
			<span class="ml-2 hidden sm:block">Filters</span>
		</button>
	</section>

	<section class="md:px-6 flex container mx-auto lg:mt-32 items-start">
		<aside class="w-64 h-screen font-roboto flex-shrink-0 hidden lg:block">
			<fieldset class="disabled:opacity-60">
				<h2 class="text-2xl mb-2">Ordering</h2>
				<select @change="changeSort" v-model="productStore.query.sort"
				        class="bg-white border px-2 py-1 rounded border-gray-400" >
					<option value="default">Default</option>
					<option value="rating-descend">Highest rated first</option>
					<option value="price-ascend">Cheapest first</option>
					<option value="price-descend">Most expensive first</option>
				</select>

				<h2 class="text-2xl mb-2 mt-8">Colors</h2>
				<div><input type="checkbox" class="mr-2"> Monochrome</div>
				<div><input type="checkbox" class="mr-2"> Variegated</div>

				<div class="mt-3"></div>
				<div><input type="checkbox" class="mr-2"> Dark</div>
				<div><input type="checkbox" class="mr-2"> Light</div>

				<div class="mt-3"></div>
				<div><input type="checkbox" class="mr-2"> Saturated</div>
				<div><input type="checkbox" class="mr-2"> Washed-out</div>

				<div class="mt-3"></div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Grayscale</div>
				<div><input type="checkbox" class="mr-2 rounded-full bg-red-600 border-red-500"> Red</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Green</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Blue</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Yellow</div>

				<h2 class="text-2xl mb-2 mt-8">Shape</h2>
				<div><input type="checkbox" class="mr-2"> Straight</div>
				<div><input type="checkbox" class="mr-2"> Curvy</div>
				<div><input type="checkbox" class="mr-2"> Squiggly</div>
				<div><input type="checkbox" class="mr-2"> Zig-zaggy</div>

				<h2 class="text-2xl mb-2 mt-8">Tags</h2>
			</fieldset>
		</aside>

		<main class="w-80 mx-auto sm:w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-start">
			<template v-if="loading">
				<WareCard/> <WareCard/> <WareCard/> <WareCard/>
				<WareCard/> <WareCard/> <WareCard/> <WareCard/>
				<WareCard/> <WareCard/> <WareCard/> <WareCard/>
			</template>

			<WareCard v-for="pid in pids" :id="pid" class=""/>

			<button @click="loadMore" class="relative"
			        v-if="pids.length" :disabled="loadingMore">
		        
		        <!-- this is a pretty terrible markup ^_^
		        	 this invisible card is to make the 
		        	 button the same size as the cards -->

		        <WareCard class="invisible"/>

		        <div class="absolute h-full w-full top-0 left-0">
		             <div class="h-full w-full rounded border-2 border-dashed flex justify-center items-center text-4xl font-pacifico text-gray-400 hover:text-gray-500"
		                  :class="{'spinner-lg': loadingMore}">
						Load<br> more<br>
		             </div>
	        	</div>
			</button>
		</main>
	</section>

	<ShopFooter/>
</template>

<script setup>
import WareCard from '@/components/WareCard.vue'
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import {storeToRefs} from 'pinia'
import { computed, ref, watch, onMounted } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const pids = computed(() => productStore.order)
const loading = computed(() => pids.value.length === 0)


onMounted(() => init(route))
onBeforeRouteUpdate(to => init(to))

function init(route) {
	queryToState(route.query)
	productStore.search({reset: false, append: false})
}



const loadingMore = ref(false)

async function loadMore () {
	loadingMore.value = true
	await productStore.search({reset: false, append: true})
	loadingMore.value = false
}


// we use event handler instead of the watch(productStore.query) here because
// watch() triggers when we assign the state in init(), which is superfluous

function changeSort () {
	router.push({
		query: stateToQuery(productStore.query)
	})
}


function queryToState (query) {
	let { search, sort } = query

	productStore.query.text = search
	productStore.query.sort = sort || "default"
}


function stateToQuery (state) {
	return {
		search: productStore.query.text,
		sort: productStore.query.sort,
		// and all the filters and all. Basically, translate the state
		// into the query string
	}
}
</script>

<style>
</style>