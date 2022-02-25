<template>
	<div class="flex space-x-1">
		<template v-for="i in [0, 1, 2, 3, 4]">
			<!-- filled star -->
			<svg v-if="props.rating > (i+0.5)" class="h-full" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
			  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="currentColor"/>
			</svg>

			<!-- empty star -->
			<svg v-else-if="props.rating < i" class="h-full p-[1px]" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
			  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" stroke="currentColor"/>
			</svg>

			<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-full p-[1px]" viewBox="0 0 20 19" fill="none">
				<path d="M10 0v13.82l-5.878 4.27 2.245-6.91L.49 6.91h7.266Z" stroke="currentColor" style="opacity:1;stroke:#000" fill="currentColor"/>
				<path d="m10 0 2.245 6.91h7.266l-5.878 4.27 2.245 6.91L10 13.82l-5.878 4.27 2.245-6.91L.49 6.91h7.266L10 0Z" stroke="currentColor" style="fill:none"/>
			</svg>
		</template>
	</div>
</template>

<script setup>
import { computed } from 'vue'

let props = defineProps({
	rating: {
		// allow undefined for loading purposes. Is it ok?
		//type: Number,
		required: true
	}
})

let rounded = computed(() => Math.round(props.rating))
</script>

<style>
</style>