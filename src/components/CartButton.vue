<template>
	<router-link class="p-2" to="/cart">
		<div class="flex justify-center" :class="{'grayout': cart.loading}">
			<ShoppingCartIcon class="h-10 lg:h-11 text-gray-600 stroke-1"/>
		</div>
		<div class="lg:mt-2 text-center w-[4em]" :class="{'grayout': cart.loading}">
			<b>{{cart.totalAmount}}</b> {{ cart.totalAmount === 1 ? "item" : "items"}}
		</div>
	</router-link>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { ShoppingCartIcon } from '@heroicons/vue/outline'

const cart = useCartStore()
</script>