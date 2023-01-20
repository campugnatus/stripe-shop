<template>
	<div class="h-20 w-full flex bg-white" :class="{'loading': loading}">
		<div class="border border-gray-400 h-full loading:grayout loading:border-none" style="aspect-ratio: 1">
			<router-link :to="`/product/`+product?.id">
				<img :src="'/stripes/svg/'+product?.filename"/>
			</router-link>
		</div>
		<div class="ml-4 lg:ml-6 py-1 flex flex-col justify-between relative flex-grow overflow-hidden">

			<div class="font-roboto truncate loading:grayout loading:w-full loading:h-6">
				<router-link :to="`/product/`+product?.id">
					{{product?.title}}
				</router-link>
			</div>
			<div class="flex items-center justify-between max-w-[150px] loading:grayout">
				<div class="hidden xs:block text-lg text-gray-500">${{price}}</div>
				<div class="hidden xs:block text-gray-500 flex-shrink">x</div>
				<select class="py-0.5 rounded font-bold text-lg border-gray-400 font-roboto w-16" :value="item.amount" @change="setAmount">
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
		<div class="flex py-1 h-full xs:border-l flex-col justify-between items-end pl-5 lg:pl-6 ml-4 lg:ml-6 font-roboto border-gray-500">
			<button class="loading:grayout" title="Remove from cart" :disabled="loading" @click="cart.removeItem(item.productId)">
				<XIcon class="h-6 text-gray-400"/>
			</button>
			<div class="text-xl w-14 text-right loading:grayout">${{total}}</div>
		</div>
	</div>
</template>

<script setup>
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { computed, toRefs, ref, reactive } from 'vue'
import { XIcon } from '@heroicons/vue/outline'
import { formatPrice } from '@/utils'

const props = defineProps({
	item: {
		type: Object,
		required: true
	}
})
const item = props.item

const productStore = useProductStore()
const cart = useCartStore()

productStore.fetchProduct(item.productId)

const product = computed(() => productStore.products[item.productId])
const total = computed(() => formatPrice(item.amount*product.value?.price))
const loading = computed(() => product.value === undefined)
const price = computed(() => formatPrice(product.value?.price))

function setAmount (evt) {
	cart.setAmount(item.productId, parseInt(evt.target.value))
}
</script>

<style>
	/* A little rant about media queries...

	   It would make more sense if I could style this component based on the
	   width of its root element, instead of the width of the viewport. Cuz
	   the relationship between the two is nonuniform. E.g. at 768px I
	   display the cart in two columns, thus leaving less space for this
	   component than at 767px */
</style>
