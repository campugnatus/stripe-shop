<template>
	<div class="flex items-center" v-if="product">
		<router-link :to="'/product/'+item.productId">
			<img :src="'/svg/'+product?.filename" class="h-20 w-20 border border-gray-300"/>
		</router-link>
		<div class="ml-4">
			<router-link :to="'/product/'+item.productId" class="text-lg">
				{{product.title}}
			</router-link>
			<div class="flex items-center gap-4">
				<span class="text-lg text-gray-500 font-mono">
					${{item.price}}
				</span>
				<XIcon class="h-5 text-gray-500"/>
				<span class="text-2xl">{{item.amount}}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue'
import { useProductStore } from '@/stores/products'
import { XIcon } from '@heroicons/vue/outline'


const productStore = useProductStore()

const props = defineProps({
	item: {
		type: Object,
		required: true
	}
})

// reactivity question: will item change when the prop changes?
const item = ref(props.item)
const product = computed(() => productStore.products[item.value.productId])
// TODO: productStore.fetchProduct(item.productId)
const loading = computed(() => product === undefined)

</script>