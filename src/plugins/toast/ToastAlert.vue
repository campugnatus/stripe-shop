<template>
	<div class="w-96 p-4 text-sm text-white rounded-r bg-tomato flex justify-between origin-left">
		<div>
			govna, {{toast.type}} {{toast.message}}
		</div>
		<button @click="$emit('close')" class="flex items-center justify-center bg-red-500 h-6 w-6 rounded-full">x</button>
	</div>
</template>

<script setup>
const props = defineProps({
	toast: {
		type: Object,
		required: true
	}
})

const emits = defineEmits(['close'])

setTimeout(() => {
	emits('close')
}, 3000)
</script>

<style>

</style>