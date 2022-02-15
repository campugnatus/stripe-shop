<template>
	<div class="relative">

		<button v-show="showLeftShadow" class="w-16 h-16 rounded-full border-4 ring-inset ring-1 ring-gray-200 border-white flex justify-center items-center absolute left-2 -translate-y-1/2 top-1/2 bg-gray-100 hover:bg-gray-200 z-20">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
		</button>

		<button v-show="showRightShadow" class="w-16 h-16 rounded-full border-4 ring-inset ring-1 ring-gray-200 border-white flex justify-center items-center absolute right-2 -translate-y-1/2 top-1/2 bg-gray-100 hover:bg-gray-200 z-20">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
		</button>	

		<div class="relative overflow-hidden" @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove" @mouseleave="mouseleave" @click.capture="onClick">
			<div v-show="showLeftShadow" class="h-full w-5 -ml-5 absolute left-0 shadow-xl z-10 border-r-4 border-red-300"></div>
			<div class="scrollbar-off flex gap-5 w-full overflow-x-auto relative px-5" ref="carousel" @scroll="onscroll">
				<!-- <div class=""></div> -->
				<WareCard v-for="product in randomProducts" :id="product.id" class="w-56"/>
				<!-- <div class=""></div> -->
			</div>
			<div v-show="showRightShadow" class="h-full w-5 -mr-5 absolute right-0 top-0 shadow-xl z-10"></div>
		</div>
	</div>
</template>

<script setup>
import WareCard from './WareCard.vue'
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()



/**
 * Choose random products to show in the carousel
 */

const lcarousel = 12

const randomProducts = computed(() => {
	const nproducts = productStore.all.length
	const res = []

	if (!nproducts) return res

	for (let i = 0; i < lcarousel; i++) {
		const iproduct = Math.round(Math.random()*nproducts)
		res[i] = productStore.all[iproduct]
	}

	return res
})






/**
 * Dragging/scrolling behaviour
 */

// true= user is holding the carousel with their mouse
let holding = false;
// true= user has moved the carousel
let moved = false;

const carousel = ref(null)
var zeroX;
var zeroScroll;
var showLeftShadow = ref(false);
var showRightShadow = ref(false);

// TODO: this value depends on the value of the gap between the flex
// elements... would be better to have a single source of truth for it, not
// sure how to do it properly
const listMargin = 21; 


onMounted(onscroll);

function mousedown (e) {
	moved = false
	e.preventDefault();
	e.stopPropagation();
	holding = true;
	zeroX = e.pageX;
	zeroScroll = carousel.value.scrollLeft;
}

function mouseup (e) {
	holding = false;
}

function mouseleave (e) {
	holding = false;
}

function mousemove (e) {
	if (!holding) return;
	moved = true;
	e.preventDefault();
	const el = carousel.value;
	var zeroOffset = zeroX - el.offsetLeft;
	var currentOffset = e.pageX - el.offsetLeft;
	var delta = currentOffset - zeroOffset;
	el.scrollLeft = zeroScroll - delta;
}

function onscroll(e) {
	var el = carousel.value;
	var scrollLength = el.scrollWidth - el.clientWidth;
	showLeftShadow.value = el.scrollLeft > listMargin;
	showRightShadow.value = el.scrollLeft < scrollLength - listMargin;
}

function onClick (evt) {
	if (moved)
		evt.preventDefault();
}




// Horisontal scrolling vs translate-x discussion
// ----------------------------------------------
//
// Just using the browser's built in scrolling seems to have some benefits.
// 1) it's already there. Why do anything else?
// 2) Some mobile nice-to-haves by default:
//    * Device tries to distinguish between vertical and horizontal scroll,
//      not doing both simultaneously
//    * Some elasticity on the edges?
//
// Scrolling drawbacks:
// 1) You can only control scroll position through JS, not through CSS
//    (although you can set margin on the element to set the initial position in
//    a way)
// 2) scrollbar-off is a bit hacky (webkit-scrollbar, wtf)

</script>

<style>
</style>