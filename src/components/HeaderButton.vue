<template>
	<button class="group p-2" :disabled="loading">
		<div class="flex justify-center">
			<div
				class="h-10 lg:h-11 [&>*]:h-full [&>*]:stroke-1 text-gray-600"
				:class="{'grayout before:rounded-full [&>*]:invisible': loading}">
				<slot name="icon"></slot>
			</div>
		</div>
		<div
			class="lg:mt-2 text-center w-[4em] truncate"
			:class="{'grayout': loading}">
			<slot></slot>
		</div>
	</button>
</template>

<script setup>
const props = defineProps(['loading'])
</script>
