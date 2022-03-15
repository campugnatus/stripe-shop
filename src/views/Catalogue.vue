<template>
	<ShopHeader :text="route.query.search"/>

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
				<select @change="changeSort" v-model="filters.sort"
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
				<div><input type="checkbox" class="mr-2 rounded-full"> Grayscale</div>
				<div><input type="checkbox" class="mr-2 rounded-full bg-red-600 border-red-500"> Red</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Green</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Blue</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Yellow</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Orange</div>
				<div><input type="checkbox" class="mr-2 rounded-full"> Brown</div>

				<h2 class="text-2xl mb-2 mt-8">Number</h2>
				<div><input type="checkbox" class="mr-2"> Single</div>
				<div><input type="checkbox" class="mr-2"> Multiple</div>

				<h2 class="text-2xl mb-2 mt-8">Shape</h2>
				<div><input v-model="filters.shape.straight" type="checkbox" class="mr-2"> Straight</div>
				<div><input v-model="filters.shape.curvy" type="checkbox" class="mr-2"> Curvy</div>
				<div><input v-model="filters.shape.squiggly" type="checkbox" class="mr-2"> Squiggly</div>
				<div><input v-model="filters.shape.edgy" type="checkbox" class="mr-2"> Edgy</div>
				<div><input v-model="filters.shape.other" type="checkbox" class="mr-2"> Other</div>
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

			<WareCard v-for="pid in pids" :id="pid"/>

			<button @click="loadMore" class="relative" v-if="haveMore" :disabled="loadingMore">
		        
		        <!-- this is a pretty terrible markup ^_^
		        	 this invisible card is to make the 
		        	 button the same size as the cards -->

		        <WareCard class="invisible"/>

		        <div class="absolute h-full w-full top-0 left-0">
		             <div :class="{'spinner-lg': loadingMore}"
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
import { computed, ref, watch, onMounted, onBeforeMount, reactive } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { showToast } from '@/plugins/toast'

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const pids = computed(() => productStore.order)
const loading = computed(() => productStore.searching)
const haveMore = computed(() => pids.value.length && productStore.more)
const foundNothing = computed(() => !loading.value && !pids.value.length)
const loadingMore = ref(false)



// make it multiple of 12 so that it spans nicely across 2, 3 or 4 columns
const PAGE_SIZE = 12*4

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
		straight: false,
		curvy:    false,
		squiggly: false,
		edgy:     false,
		other:    false,
	},

	text: undefined,
	sort: "default",
})

onMounted(() => init(route))
onBeforeRouteUpdate(to => init(to))



function init(route) {
	log("init", route)
	parseQueryString(route.query)

	productStore.search({
		append: false,
		from: 0,
		to: PAGE_SIZE - 1, // reserve one place for the "load more" button

		text: filters.text,
		sort: filters.sort,
		shape: Object.keys(filters.shape).filter(key => !!filters.shape[key]),
		color: Object.keys(filters.color).filter(key => !!filters.color[key]),

	}).catch(() =>
		showToast.error("Oops... something went wrong")
	)
}

watch(filters, () => {
	log("filters changed", filters.shape)
	router.push({
		query: stateToQuery()
	})
})

function stateToQuery () {
	return {
		search: filters.text,
		sort: filters.sort === "default" ? undefined : filters.sort,
		shape: Object.keys(filters.shape).filter(key => !!filters.shape[key]),
		color: Object.keys(filters.color).filter(key => !!filters.color[key]),
	}
}

function parseQueryString(query) {
	filters.color.gray     = query.color?.includes('gray') ?? false
	filters.color.red      = query.color?.includes('red') ?? false
	filters.color.green    = query.color?.includes('green') ?? false
	filters.color.blue     = query.color?.includes('blue') ?? false
	filters.color.yellow   = query.color?.includes('yellow') ?? false
	filters.color.orange   = query.color?.includes('orange') ?? false
	filters.color.brown    = query.color?.includes('brown') ?? false

	filters.shape.straight = query.shape?.includes('straight') ?? false
	filters.shape.curvy    = query.shape?.includes('curvy') ?? false
	filters.shape.squiggly = query.shape?.includes('squiggly') ?? false
	filters.shape.edgy     = query.shape?.includes('edgy') ?? false
	filters.shape.other    = query.shape?.includes('other') ?? false

	filters.sort = query.sort ?? "default"
	filters.text = query.search
}


async function loadMore () {
	loadingMore.value = true
	await productStore.search({
		append: true,
		from: productStore.order.length,
		to: productStore.order.length + PAGE_SIZE,

		text: filters.text,
		sort: filters.sort,
		shape: Object.keys(filters.shape).filter(key => !!filters.shape[key]),
		color: Object.keys(filters.color).filter(key => !!filters.color[key]),

	}).catch(() =>
		showToast.error("Oops... something went wrong")
	)
	loadingMore.value = false
}

</script>

<style>
</style>