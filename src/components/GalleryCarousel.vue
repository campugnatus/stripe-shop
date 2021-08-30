<template>
	<div class="overflow-hidden w-full" @mousedown="mousedown" @touchstart="mousedown">
	  <section :style="{'height': height+'px'}" class="w-[4000px] items-center gap-10 flex ml-[50%]" ref="carousel">
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
	  height: {
	  	default: 72,
	  	type: Number
	  }
	})

	// true= the user is holding the carousel
	var holding = false;

	// the element we're scrolling
	var carousel = ref(null);

	// carousel's translation offset as it was when the user grabbed it
	var offset0 = undefined;

	// pageX of the point where the user grabbed the carousel
	var grabPoint = undefined;

	// the spring back animation that plays after the user has released the carousel
	var tween = null;





	onMounted(() => {
		gsap.set(carousel.value, {x: props.initial})
	});

	function mousedown (e) {
		holding = true;

		if (tween)
			// stop the animation: the user has a hold of it now
			tween.kill();

		offset0 = parseInt(carousel.value._gsap.x);
		grabPoint = e.pageX || e.touches && e.touches[0].pageX;

		document.addEventListener("mousemove", mousemove);
		document.addEventListener("touchmove", mousemove);
		document.addEventListener("mouseup", mouseup);
		document.addEventListener("touchend", mouseup);
	}

	function mouseup (e) {
		document.removeEventListener("mousemove", mousemove);
		document.removeEventListener("touchmove", mousemove);
		document.removeEventListener("mouseup", mouseup);
		document.removeEventListener("touchend", mouseup);

		holding = false;
		if (tween) tween.kill();
		return;
		// spring back animation
		tween = gsap.to(carousel.value, {
				duration: 0.5,
				x: props.initial,
				ease: "elastic.out(1, 0.75)"
		});
	}

	function mousemove (e) {
		if (!holding) return;
		let point = e.pageX || e.touches && e.touches[0].pageX;
		let deltaX = point - grabPoint;
		let newOffset = offset0 + deltaX;
		gsap.set(carousel.value, {x: newOffset})
	}
</script>

<style>
	
</style>