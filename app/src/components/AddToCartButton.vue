<template>
	<span>
		<span v-if="inCart" class="w-full flex">
			<button class="bg-primary rounded-l py-1 px-4 text-white hover:bg-gray-600 active:bg-black"
					@click="cart.subtractItem(props.pid)">
				-
			</button>
			<router-link class="bg-primary text-center flex-grow py-1 px-2 text-white hover:bg-gray-600"
						 to="/cart">
				<b>{{inCart}}</b> {{ props.small? "" : "in cart" }}
			</router-link>
			<button class="bg-primary rounded-r py-1 px-4 text-white hover:bg-gray-600 active:bg-black"
					@click="cart.addItem(props.pid)">
				+
			</button>
		</span>

		<button v-else class="bg-primary w-full rounded text-white py-1 px-2 flex-shrink"
				@click="cart.addItem(props.pid)">
			Add to cart
		</button>
	</span>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const props = defineProps({
	pid: {
		type: String,
		required: true
	},
	small: Boolean
})

const cart = useCartStore()
const inCart = computed(() => cart.findItem(props.pid)?.amount || 0)
</script>

<style>
	
</style>