<template>
	<ShopHeader class="!max-w-screen-2xl" :text="filters.text" @reset="filters.text = undefined"/>

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
			<FilterIcon class="h-6"/>
			<span class="ml-2 hidden sm:block">Filters</span>
		</button>
	</section>

	<section class="md:px-6 flex max-w-screen-2xl mx-auto lg:mt-32 items-start">
		<aside class="w-64 pr-12 font-roboto flex-shrink-0 hidden lg:block">
			<fieldset class="disabled:opacity-60">

				<h2 class="text-2xl mb-2 flex items-center justify-between">
					Sorting
					<button
						v-if="filtersOn"
						class="text-sm flex text-blue-600"
						@click="clearFilters">
						Clear filters
					</button>
				</h2>
				<select @change="changeSort" v-model="filters.sort"
				        class="bg-white w-full border px-2 py-1 rounded border-gray-400" >
					<option value="default">Default</option>
					<option value="rating-descend">Highest rated first</option>
					<option value="price-ascend">Cheapest first</option>
					<option value="price-descend">Most expensive first</option>
				</select>

				<h2 class="text-2xl mb-2 mt-8">Color</h2>
				<label v-for=", color in filters.color" class="flex items-center">
					<input
						v-model="filters.color[color]"
						type="checkbox"
						:name="color"
						:id="color"
						:class="[colorClass[color]]"
						class="mr-3 rounded-full border-none">

					{{capitalize(color)}}
				</label>

				<h2 class="text-2xl mb-2 mt-8">Number</h2>
				<label v-for=", number in filters.number" class="flex items-center">
					<input v-model="filters.number[number]" :id="number" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">

					{{capitalize(number)}}
				</label>

				<h2 class="text-2xl mb-2 mt-8">Shape</h2>
				<label v-for=", shape in filters.shape" class="flex items-center">
					<input v-model="filters.shape[shape]" :id="shape" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">

					{{capitalize(shape)}}
				</label>

				<h2 class="text-2xl mb-2 mt-8">Tags</h2>
				<div class="space-y-2">
					<button v-for="value, tag in filters.tags"
					      class="product-tag"
					      @click="filters.tags[tag] = !filters.tags[tag]"
					      :class="{'!bg-gray-500 !text-white': value}">
						{{tag}}
					</button>
				</div>

			</fieldset>
		</aside>

		<div v-if="foundNothing" class="h-[30vh] w-full font-pacifico text-4xl flex justify-center items-center">
			<div class="relative w-max">
				<div class="leading-[0.8em]">
					<!-- <div class="font-sigmar tracking-[0.15em] text-gray-400">nope</div> -->
					<div class="font-sigmar">don't</div>
					<div class="font-sigmar tracking-widest">have</div>
					<div class="font-sigmar tracking-[0.14em]">that</div>
				</div>
			</div>
		</div>

		<main v-else class="w-80 mx-auto sm:w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-start">
			<template v-if="loading">
				<WareCard/> <WareCard/> <WareCard/> <WareCard/>
				<WareCard/> <WareCard/> <WareCard/> <WareCard/>
				<WareCard/> <WareCard/> <WareCard/> <WareCard/>
			</template>

			<template v-else>
				<WareCard v-for="pid in pids" :id="pid"/>
			</template>

			<button @click="loadMore" class="relative" v-if="!loading && haveMore" :disabled="loadingMore">
		        
		        <!-- this is a pretty terrible markup ^_^
		        	 this invisible card is to make the 
		        	 button the same size as the cards -->

		        <WareCard class="invisible"/>

		        <div class="absolute h-full w-full top-0 left-0">
		             <div :class="{'spinner-2xl': loadingMore}"
		                  class="h-full w-full rounded border-2 border-dashed flex justify-center items-center text-4xl font-pacifico text-gray-400 hover:text-gray-500">
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
import { computed, ref, watch, onMounted, onBeforeMount, reactive, nextTick, inject } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { showToast } from '@/plugins/toast'
import { capitalize } from '@/utils'
import { FilterIcon } from '@heroicons/vue/outline'

import {useTitle} from '@vueuse/core'
useTitle("Catalogue", {titleTemplate: inject('titleTemplate')})

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const pids = computed(() => productStore.order)
const loading = computed(() => productStore.searching && !productStore.appending)
const haveMore = computed(() => pids.value.length && productStore.more)
const foundNothing = computed(() => !loading.value && !pids.value.length)
const loadingMore = computed(() => productStore.appending)

// make it multiple of 12 so that it spans nicely across 2, 3 or 4 columns
const PAGE_SIZE = 12*4

// can't generate tailwind class names programmatically
const colorClass = {
	gray:   "bg-gray-700    text-gray-700    focus:ring-gray-700",
	red:    "bg-tomato      text-tomato      focus:ring-tomato",
	green:  "bg-emerald-600 text-emerald-600 focus:ring-emerald-600",
	blue:   "bg-cyan-600    text-cyan-600    focus:ring-cyan-600",
	yellow: "bg-yellow-200  text-yellow-200  focus:ring-yellow-200",
	orange: "bg-orange      text-orange      focus:ring-orange",
	brown:  "bg-yellow-800  text-yellow-800  focus:ring-yellow-800",
}

const filters = reactive({
	color: {
		gray:   false,
		red:    false,
		green:  false,
		blue:   false,
		yellow: false,
		orange: false,
		brown:  false,
	},

	shape: {
		straight:  false,
		curvy:     false,
		squiggly:  false,
		edgy:      false,
		shapey:    false,
	},

	number: {
		single: false,
		multiple: false,
	},

	tags: {
		monochrome: false,
		'3d': false,
		animate: false,
		jigsaw: false,
		'world art': false,
	},

	text: undefined,
	sort: "default",
})


const filtersOn = computed(() => {
	for (let group of Object.values(filters)) {
		if (typeof group !== 'object') continue

		for (let [tagname, isOn] of Object.entries(group))
			if (isOn)
				return true
	}
	return false
})

function clearFilters () {
	for (let [key, group] of Object.entries(filters)) {
		if (typeof group !== 'object') continue

		for (let [tagname, isOn] of Object.entries(group))
			if (isOn)
				filters[key][tagname] = false
	}
}


onMounted(() => init(route))
onBeforeRouteUpdate(to => init(to))

let initialized = false

watch(filters, () => {
	if (initialized) {
		router.push({
			query: stateToQuery()
		})
	}
})


function init(route) {
	initialized = false
	parseQueryString(route.query)

	// this double-nextTick craziness is our way of avoiding the watcher
	// triggering on route updates. Is there a more civilized way?
	nextTick(() => nextTick(() => initialized = true))

	loadProducts({append: false})
}



const filterString = computed(() => {
	const filterList = []
	for (let group of Object.values(filters)) {
		if (typeof group !== 'object') continue

		for (let [tagname, isOn] of Object.entries(group))
			if (isOn)
				filterList.push(tagname)
	}
	return filterList.length? filterList.join(",") : undefined
})



function stateToQuery () {
	return {
		search: filters.text,
		sort:   filters.sort === "default" ? undefined : filters.sort,
		filter: filterString.value
	}
}



function parseQueryString (query) {
	filters.sort = query.sort ?? "default"
	filters.text = query.search

	const queryFilters = query.filter?.split(",") ?? []

	for (let group of Object.keys(filters)) {
		if (typeof filters[group] !== 'object') continue

		for (let tag of Object.keys(filters[group]))
			filters[group][tag] = queryFilters.includes(tag)
	}
}



async function loadProducts ({append}) {
	const from = append? productStore.order.length : 0
	const oneForTheLoadMoreButton = (append? 0 : 1)

	await productStore.search({
		append,
		from,
		to: from + PAGE_SIZE - oneForTheLoadMoreButton,

		text: filters.text,
		sort: filters.sort,
		shape: Object.keys(filters.shape).filter(key => !!filters.shape[key]),
		color: Object.keys(filters.color).filter(key => !!filters.color[key]),
		number: Object.keys(filters.number).filter(key => !!filters.number[key]),
		tags: Object.keys(filters.tags).filter(key => !!filters.tags[key]),

	}).catch((e) => {
		console.error("Couldn't load products", e)
		showToast.error("Couldn't load products... for some reason")
	})
}



async function loadMore () {
	loadProducts({append: true})
}
</script>

<style>
</style>