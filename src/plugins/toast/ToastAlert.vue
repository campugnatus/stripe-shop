<template>
	<div class=" w-96 text-sm --bg-tomato origin-left flex justify-between w-full items-stretch drop-shadow-lg cursor-pointer"
		 @click="emits('close')"
		 :class="[
			type === 'notification' ? 'bg-gray-600 text-white' :
			type === 'error'        ? 'bg-tomato text-white'   :
			type === 'alert'        ? 'bg-orange text-primary' :
			type === 'success'      ? 'bg-green-600 text-white': ''
		 ]">

		<div class="flex items-center ml-3">
			<InformationCircleIcon v-if="type === 'notification'" class="h-6 text-white"/>
			<XCircleIcon           v-if="type === 'error'"        class="h-6 text-white"/>
			<ExclamationIcon       v-if="type === 'alert'"        class="h-6 text-primary"/>
			<CheckCircleIcon       v-if="type === 'success'"      class="h-6 text-white"/>
		</div>

		<div class="p-4 z-10">
			{{toast.message}}
		</div>

		<div class="relative">
			<div class="absolute left-0 top-0 w-0 h-0 border-[52px] border-transparent -translate-x-1/2"
			     :class="{
					'border-t-gray-600':  type === 'notification',
					'border-t-tomato':    type === 'error',
					'border-t-orange':    type === 'alert',
					'border-t-green-600': type === 'success',
			     }">
			</div>
			<div class="absolute left-0 bottom-0 w-0 h-0 border-[52px] border-transparent --border-b-tomato -translate-x-1/2"
			     :class="{
					'border-b-gray-600':  type === 'notification',
					'border-b-tomato':    type === 'error',
					'border-b-orange':    type === 'alert',
					'border-b-green-600': type === 'success',
			     }">
			</div>
		</div>
	</div>
</template>

<script setup>
import {computed} from 'vue'
import {CheckCircleIcon, InformationCircleIcon, XCircleIcon} from '@heroicons/vue/solid'
import {ExclamationIcon} from '@heroicons/vue/outline'

const props = defineProps({
	toast: {
		type: Object,
		required: true
	}
})

const type = computed(() => props.toast.type)
const emits = defineEmits(['close'])
const timeout = computed(() => props.toast.message.length*100) 

setTimeout(() => emits('close'), Math.max(timeout.value, 3000))
</script>

<style>
</style>