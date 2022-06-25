<template>
	<router-link to="/cart">
		<HeaderButton :loading="cart.loading">
			<template #icon>
				<ShoppingCartIcon/>
			</template>

			<b>{{cart.totalAmount}}</b> {{ cart.totalAmount === 1 ? "item" : "items"}}
		</HeaderButton>
	</router-link>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import HeaderButton from '@/components/HeaderButton.vue'

const cart = useCartStore()
</script>