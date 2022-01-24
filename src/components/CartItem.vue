<template>
	<div class="h-20 w-full flex" v-if="product">
		<div class="border border-gray-400 h-full" style="aspect-ratio: 1">
      		<img :src="'/svg/'+product.filename"/>
		</div>
		<div class="ml-4 lg:ml-6 py-1 flex flex-col justify-between relative flex-grow overflow-hidden">

 			<div class="font-roboto truncate">{{product.title}}</div>
			<div class="flex items-center">
				<div class="text-lg text-gray-500">${{product.price}}</div>
				<div class="mx-4 text-gray-500">x</div>
				<select class="py-0.5 rounded font-bold text-lg border-gray-400 font-roboto w-16"
				        :value="item.amount"
				        @change="setAmount">
					<option>0</option>
					<option selected>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
					<option>8</option>
					<option>9</option>
				</select>
			</div>
		</div>
		<div class="hidden xs:flex py-1 h-full border-l flex-col justify-between items-end pl-5 lg:pl-6 ml-4 lg:ml-6 font-roboto border-primary">
			<button class="" title="Remove from cart" @click="cart.removeItem(item.productId)">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<div class="text-xl w-14 text-right">${{total}}</div>
		</div>
	</div>
</template>

<script setup>
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { computed, toRefs, ref, reactive } from 'vue'

const props = defineProps({
	item: {
		type: Object,
		required: true
	}
})
const item = props.item

const productStore = useProductStore()
const cart = useCartStore()

const product = productStore.getProductById(item.productId)
const total = computed(() => (item.amount*product.price).toFixed(2))

function setAmount (evt) {
	cart.setAmount(item.productId, parseInt(evt.target.value))
}
</script>

<style>
	
</style>