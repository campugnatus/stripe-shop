<template>
	<div class="overflow-x-auto scrollbar-off" @mousedown="mousedown" @touchstart="mousedown" ref="container">
	  <section class="h-full items-center gap-6 sm:gap-10 flex" ref="carousel">
	  	<slot></slot>
	  </section>
	</div>
</template>

<script setup>
	import {ref, onMounted, computed} from 'vue';
	import { gsap } from "gsap";

	const props = defineProps({
	  initial: {
	  	default: 0,
	  	type: Number
	  },
	})

	// true= the user is holding the carousel
	var holding = false;

	// the element we're scrolling
	var carousel = ref(null);
	var container = ref(null);

	// carousel's translation offset as it was when the user grabbed it
	var offset0 = undefined;

	// pageX of the point where the user grabbed the carousel
	var grabPoint = undefined;

	// the spring back animation that plays after the user has released the carousel
	var tween = null;





	onMounted(() => {
		// container.value.scrollLeft = 300;
		// gsap.set(container.value, {
		// 	attr: {
		// 		scrollLeft: 300 //props.initial
		// 	}
		// });
	});

	// function mousedown (e) {
	// 	holding = true;

	// 	if (tween)
	// 		// stop the animation: the user has a hold of it now
	// 		tween.kill();

	// 	offset0 = parseInt(carousel.value._gsap.x);
	// 	grabPoint = e.pageX || e.touches && e.touches[0].pageX;

	// 	document.addEventListener("mousemove", mousemove);
	// 	document.addEventListener("touchmove", mousemove);
	// 	document.addEventListener("mouseup", mouseup);
	// 	document.addEventListener("touchend", mouseup);
	// }

	// function mouseup (e) {
	// 	document.removeEventListener("mousemove", mousemove);
	// 	document.removeEventListener("touchmove", mousemove);
	// 	document.removeEventListener("mouseup", mouseup);
	// 	document.removeEventListener("touchend", mouseup);

	// 	holding = false;
	// 	if (tween) tween.kill();
	// 	return;
	// 	// spring back animation
	// 	tween = gsap.to(carousel.value, {
	// 			duration: 0.5,
	// 			x: props.initial,
	// 			ease: "elastic.out(1, 0.75)"
	// 	});
	// }

	// function mousemove (e) {
	// 	if (!holding) return;
	// 	let point = e.pageX || e.touches && e.touches[0].pageX;
	// 	let deltaX = point - grabPoint;
	// 	let newOffset = offset0 + deltaX;
	// 	gsap.set(carousel.value, {
	// 		attr: {
	// 			scrollLeft: newOffset
	// 		}
	// 	});
	// }
</script>

<style>
	
</style>