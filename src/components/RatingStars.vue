<template>
	<div class="flex space-x-1">
		<template v-for="i in [1, 2, 3, 4, 5]">
			<svg v-if="rounded >= i" class="h-full" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
			  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="currentColor"/>
			</svg>
			<svg v-else class="h-full p-[1px]" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
			  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" stroke="currentColor"/>
			</svg>
		</template>
	</div>
</template>

<script setup>
import { computed } from 'vue'

let props = defineProps({
	rating: {
		type: Number,
		required: true
	}
})

let rounded = computed(() => Math.round(props.rating))
</script>

<style>
</style>