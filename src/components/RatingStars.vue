<template>
	<div class="flex space-x-1">
		<template v-for="i in [0, 1, 2, 3, 4]">

			<!-- filled star -->
			<svg v-if="props.rating > (i+0.5)" xmlns="http://www.w3.org/2000/svg" class="h-full" viewBox="0 0 20 20" fill="currentColor">
			  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>

			<!-- empty star -->
			<svg v-else-if="props.rating < i" xmlns="http://www.w3.org/2000/svg" class="h-full text-gray-300" viewBox="0 0 20 20" fill="currentColor">
			  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>

			<!-- half-assed star -->
			<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-full" viewBox="0 0 20 20" fill="currentColor">
				<path class="text-gray-300" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/>
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l-.364 11.32a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
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