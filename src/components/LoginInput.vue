<template>
	<div class="relative text-sm">
		<Popover v-if="info">
			<PopoverButton class="absolute right-2 top-1/2 -translate-y-1/2">
				<InformationCircleIcon class="h-5 text-sm text-gray-300 hover:text-gray-400 text-xs"/>
			</PopoverButton>
			<transition
				enter-active-class="transition duration-200 ease-out"
				enter-from-class="translate-y-1 opacity-0"
				enter-to-class="translate-y-0 opacity-100"
				leave-active-class="transition duration-150 ease-in"
				leave-from-class="translate-y-0 opacity-100"
				leave-to-class="translate-y-1 opacity-0">
				<PopoverPanel class="rounded absolute shadow-lg top-[calc(100%+8px)] right-0 z-20">
					<div class="relative isolate">
						<div class="absolute bg-gray-500 h-3 w-3 border border-gray-600 rotate-45 top-[-6px] right-3 shadow-xl"></div>
						<div class="p-3 bg-gray-500 isolate rounded text-white">
							The way you'd like us to call you in the emails we send you.
							This is also how your name will appear in the comments you leave here.
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>

		<input
			ref="input"
			:type="props.password? 'password':'text'"
			@input="emit('update:modelValue', $event.target.value)"
			:value="modelValue"
			:placeholder="placeholder"
			:class="{'peer border-tomato focus:border-tomato focus:ring-tomato': error}"
			class="text-sm w-full rounded border-gray-400"/>

		<div class="absolute opacity-0 peer-focus:opacity-100 -top-3 peer-focus:transition-all peer-focus:-top-full right-0 border border-red-300 rounded z-[-1] shadow-lg peer-focus:z-30">
			<div class="relative">
				<div class="absolute border border-red-300 h-3 w-3 bg-red-200 rotate-45 top-[calc(100%-6px)] z-[-1] right-3 shadow-lg"></div>
				<div class="bg-red-200 py-1 px-2 rounded">
					{{props.error}}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { onMounted, ref } from 'vue'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	PopoverOverlay,
} from '@headlessui/vue'

const props = defineProps({
	'error': String,
	'info': String,
	'modelValue': String,
	'placeholder': String,
	'focus': Boolean,
	'password': Boolean
})
const emit = defineEmits(['update:modelValue'])

const input = ref()

onMounted(() => {
	if (props.focus) {
		input.value.focus()
	}
})
</script>