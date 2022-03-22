<template>
	<div class="flex items-center" :class="{loading}">
		<router-link :to="'/product/'+item.productId" class="loading:grayout">
			<img :src="'/svg/'+product?.filename" class="h-20 w-20 border loading:border-none border-gray-300"/>
		</router-link>
		<div class="ml-4">
			<router-link :to="'/product/'+item.productId" class="text-lg loading:grayout loading:w-10 loading:h-20 loading:after:content-[zhopa]">
				{{product?.title || "loading"}}
			</router-link>
			<div class="flex items-center gap-4 loading:grayout">
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

const item = ref(props.item)
productStore.fetchProduct(item.value.productId)
const product = computed(() => productStore.products[item.value.productId])
const loading = computed(() => product.value === undefined)

</script>