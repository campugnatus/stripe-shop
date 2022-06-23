<template>
  <div :class="{'loading border-0': loading}" class="w-full rounded-lg border overflow-hidden flex-shrink-0">
    <div class="relative overflow-hidden" style="aspect-ratio: 1">
      <router-link v-if="product" :to="`/product/`+product?.id">
        <img :src="'/svg/'+product?.filename"/>
      </router-link>
      <div v-if="loading" class="grayout w-[150%] h-12 absolute top-1/2 translate-x-[-50%] translate-y-[-50%] left-1/2 rotate-[-60deg]"></div>
    </div>
    <div class="bg-gray-50 border-t p-2 flex flex-col loading:bg-transparent loading:border-transparent">
      <router-link :to="'/product/' + product?.id">
        <h1 class="text-lg truncate loading:grayout">
          {{loading? "hi" : product?.title}}
        </h1>
      </router-link>

      <div class="mt-1 mb-1 flex items-center">
        <RatingStars :rating="product?.rating" class="h-5 loading:grayout" :title="product?.rating"/>
        <span class="ml-auto loading:grayout loading:w-6">{{product?.nreviews || 0}}</span>
        <div class="loading:grayout">
          <ChatAltIcon class="ml-1 h-6 text-gray-700"/>
        </div>
      </div>

      <div class="flex-grow">
        <div class="h-16 text-sm mt-1 mb-2 multiline-ellipsis loading:grayout">
          {{product?.description}}
        </div>
      </div>

      <div class="flex mb-2 justify-between items-center loading:grayout">
        <span class="text-2xl text-gray-700 mr-3 font-semibold">
          ${{price}}
        </span>
        <AddToCartButton v-if="props.id" small :pid="props.id" class="text-sm flex-grow"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import RatingStars from '@/components/RatingStars.vue'
import AddToCartButton from '@/components/AddToCartButton.vue'
// import {  } from '@heroicons/vue/solid'
import { ChatAltIcon } from '@heroicons/vue/outline'


import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { computed, watch, onMounted } from 'vue'
import { formatPrice } from '@/utils'

const props = defineProps({
  id: {
    type: String,
    // if undefined, we'll just show the loading state
    required: false,
  }
})
const productStore = useProductStore()
const cartStore = useCartStore()

const product = computed(() => productStore.products[props.id])
const loading = computed(() => product.value === undefined)
const price = computed(() => formatPrice(product.value?.price))

watch(props, () => {
  props.id && productStore.fetchProduct(props.id)
}, {
  immediate: true
})
</script>

<style>
</style>