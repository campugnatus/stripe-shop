<template>
	<footer class="bg-gray-50 h-[700px] mt-52 relative">
		<button @click="scrollToTop" class="w-28 h-28 rounded-full border-8 border-white flex justify-center items-center absolute right-1/4 -top-12 bg-gray-100 hover:bg-gray-200">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 10l7-7m0 0l7 7m-7-7v18" />
			</svg>
		</button>
	</footer>
</template>

<script setup>
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

function scrollToTop () {
	gsap.to(window, {
		duration: 1,
		scrollTo: 0,
		ease: "power2.inOut"
	})
}
</script>

<style>
</style>