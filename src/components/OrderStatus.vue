<script setup>
import {computed} from 'vue'

const props = defineProps({
	status: {
		type: Object,
		required: true
	},
	lg: {
		type: Boolean
	}
})

const blue = computed(() => props.status.waiting || props.status.status === 'shipped')
</script>

<template>
	<span
		class="uppercase rounded-full"
	    :class="[
	    	lg? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs',
	    	blue? 'bg-blue-300 text-white' : 'bg-white border text-gray-500',
	    	props.status.waiting? 'animate-slide' :''
    	]">
		{{ props.status.status }}
	</span>
</template>

<style scoped>
.animate-slide {
	background: linear-gradient(111deg, #94c6fd, #94c6fd 40%, #84bbf5 60%, #94c6fd 60%);
	background-size: 300% 100%;
	animation: animation-slide 1.5s linear infinite;
}

@keyframes animation-slide {
	0% {
		background-position: 100%;
	}
	100% {
		background-position: 0%;
	}
}
</style>