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
		<div class="relative overflow-hidden" @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove" @mouseleave="mouseleave">
			<div v-show="showLeftShadow" class="h-full w-5 -ml-5 absolute left-0 shadow-xl z-10 border-r-4 border-red-300"></div>
			<div class="carousel flex gap-5 w-full overflow-x-auto relative" ref="carousel" @scroll="onscroll">
				<div class=""></div>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<WareCard/>
				<div class=""></div>
			</div>
			<div v-show="showRightShadow" class="h-full w-5 -mr-5 absolute right-0 top-0 shadow-xl z-10"></div>
		</div>
	</div>
</template>

<script setup>
import WareCard from './WareCard.vue'
import {ref, onMounted} from 'vue';

// true= user is holding the carousel with their mouse
var holding = false;

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
</script>

<style>
.carousel {
	/* add nice overscroll on ios  */
	-webkit-overflow-scrolling: touch; 
}

.carousel::-webkit-scrollbar {
	display: none;
}
</style>