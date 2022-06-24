<template>
	<ShopHeader :text="filters.text" @reset="filters.text = undefined"/>

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
		<aside class="w-64 font-roboto flex-shrink-0 hidden lg:block">
			<fieldset class="disabled:opacity-60">
				<h2 class="text-2xl mb-2">Sorting</h2>
				<select @change="changeSort" v-model="filters.sort"
				        class="bg-white border px-2 py-1 rounded border-gray-400" >
					<option value="default">Default</option>
					<option value="rating-descend">Highest rated first</option>
					<option value="price-ascend">Cheapest first</option>
					<option value="price-descend">Most expensive first</option>
				</select>

				<h2 class="text-2xl mb-2 mt-8">Color</h2>
				<div class="">
					<div class="flex items-center">
						<input v-model="filters.color.gray" type="checkbox" name="gray" id="gray"
						       class="mr-3 rounded-full bg-gray-700 border-none text-gray-700 focus:ring-gray-700">
						<label for="gray">Grayscale</label>
					</div>
					<div class="flex items-center">
						<input v-model="filters.color.red" type="checkbox" name="red" id="red"
						       class="mr-3 rounded-full bg-tomato border-none text-tomato focus:ring-tomato">
						<label for="red">Red</label>
					</div>
					<div class="flex items-center">
						<input v-model="filters.color.green" type="checkbox" name="green" id="green"
						       class="mr-3 rounded-full bg-emerald-600 border-none text-emerald-600 focus:ring-emerald-600">
						<label for="green">Green</label>
					</div>
					<div class="flex items-center">
						<input v-model="filters.color.blue" type="checkbox" name="blue" id="blue"
						       class="mr-3 rounded-full bg-cyan-600 border-none text-cyan-600 focus:ring-cyan-600">
						<label for="blue">Blue</label>
					</div>
					<div class="flex items-center">
						<input v-model="filters.color.yellow" type="checkbox" name="yellow" id="yellow"
						       class="mr-3 rounded-full bg-yellow-200 border-none text-yellow-200 focus:ring-yellow-200">
						<label for="yellow">Yellow</label>
					</div>
					<div class="flex items-center">
						<input v-model="filters.color.orange" type="checkbox" name="orange" id="orange"
						       class="mr-3 rounded-full bg-orange border-none text-orange focus:ring-orange">
						<label for="orange">Orange</label>
					</div>
					<div class="flex items-center">
						<input v-model="filters.color.brown" type="checkbox" name="brown" id="brown"
						       class="mr-3 rounded-full bg-yellow-800 border-none text-yellow-800 focus:ring-yellow-800">
						<label for="brown">Brown</label>
					</div>
				</div>

				<h2 class="text-2xl mb-2 mt-8">Number</h2>
				<div class="flex items-center">
					<input v-model="filters.number.single" id="single" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">
					<label for="single">Single</label>
				</div>
				<div class="flex items-center">
					<input v-model="filters.number.multiple" id="multiple" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">
					<label for="multiple">Multiple</label>
				</div>

				<h2 class="text-2xl mb-2 mt-8">Shape</h2>
				<div class="flex items-center">
					<input v-model="filters.shape.straight" id="straight" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">
					<label for="straight">Straight</label>
				</div>
				<div class="flex items-center">
					<input v-model="filters.shape.curvy" id="curvy" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">
					<label for="curvy">Curvy</label>
				</div>
				<div class="flex items-center">
					<input v-model="filters.shape.squiggly" id="squiggly" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">
					<label for="squiggly">Squiggly</label>
				</div>
				<div class="flex items-center">
					<input v-model="filters.shape.edgy" id="edgy" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">
					<label for="edgy">Edgy</label>
				</div>
				<div class="flex items-center">
					<input v-model="filters.shape.shapey" id="shapey" type="checkbox"
					       class="mr-3 text-primary focus:ring-primary">
					<label for="shapey">Other</label>
				</div>

				<h2 class="text-2xl mb-2 mt-8">Tags</h2>
				<div class="space-y-2">
					<button v-for="value, tag in filters.tags"
					      class="text-sm py-0.5 px-2 bg-gray-200 rounded mr-2 text-gray-600"
					      @click="filters.tags[tag] = !filters.tags[tag]"
					      :class="{'bg-gray-500 !text-white': value}">
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
import { computed, ref, watch, onMounted, onBeforeMount, reactive, nextTick } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { showToast } from '@/plugins/toast'

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const pids = computed(() => productStore.order)
const loading = computed(() => productStore.searching && !productStore.appending)
const haveMore = computed(() => pids.value.length && productStore.more)
const foundNothing = computed(() => !loading.value && !pids.value.length)
const loadingMore = computed(() => productStore.appending)
// const loadingMore = ref(false)

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

	productStore.search({
		append: false,
		from: 0,
		to: PAGE_SIZE - 1, // reserve one place for the "load more" button

		text: filters.text,
		sort: filters.sort,
		shape:  Object.keys(filters.shape).filter(key => !!filters.shape[key]),
		color:  Object.keys(filters.color).filter(key => !!filters.color[key]),
		number: Object.keys(filters.number).filter(key => !!filters.number[key]),
		tags:   Object.keys(filters.tags).filter(key => !!filters.tags[key]),

	}).catch((e) => {
		showToast.error("Something went wrong")
	})
}


function stateToQuery () {
	return {
		search: filters.text,
		sort: filters.sort === "default" ? undefined : filters.sort,
		shape: Object.keys(filters.shape).filter(key => !!filters.shape[key]),
		color: Object.keys(filters.color).filter(key => !!filters.color[key]),
		number: Object.keys(filters.number).filter(key => !!filters.number[key]),
		tags:   Object.keys(filters.tags).filter(key => !!filters.tags[key]),
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

	filters.number.single  = query.number?.includes('single') ?? false
	filters.number.multiple  = query.number?.includes('multiple') ?? false

	for (let key of Object.keys(filters.tags)) {
		filters.tags[key] = query.tags?.includes(key) ?? false
	}

	filters.sort = query.sort ?? "default"
	filters.text = query.search
}


async function loadMore () {
	await productStore.search({
		append: true,
		from: productStore.order.length,
		to: productStore.order.length + PAGE_SIZE,

		text: filters.text,
		sort: filters.sort,
		shape: Object.keys(filters.shape).filter(key => !!filters.shape[key]),
		color: Object.keys(filters.color).filter(key => !!filters.color[key]),

	}).catch(() =>
		showToast.error("Something went wrong")
	)
}

</script>

<style>
</style>