<template>
	<transition name="toast">
		<div v-if="show" class="w-96 max-w-full p-4 fixed bottom-10 text-sm text-white rounded-r bg-tomato flex justify-between origin-left">
			<div>
				govna, {{show}} {{type}} {{message}}
			</div>
			<button @click="hideToast" class="flex items-center justify-center bg-red-500 h-6 w-6 rounded-full">x</button>
		</div>
	</transition>
</template>

<script setup>
import {show, type, message} from '.'

function hideToast () {
	show.value = false
}

</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease-out;
}

.toast-enter-from {
  transform: translateX(-110%) rotate(-5deg);
}

.toast-leave-to {
  transform: translateX(-110%) rotate(3deg);
}
</style>