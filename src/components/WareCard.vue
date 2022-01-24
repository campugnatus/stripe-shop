<template>
  <div class="w-full rounded-lg border overflow-hidden flex-shrink-0" v-if="product">
    <div class="bg-white" style="aspect-ratio: 1">
      <img :src="'/svg/'+product.filename"/>
    </div>
    <div class="bg-gray-50 border-t p-2 flex flex-col">
      <router-link :to="'/product/' + product.id">
        <h1 class="text-lg truncate">{{product.title}}</h1>
      </router-link>

      <div class="flex mt-1 mb-1 justify-between">
        <div class="flex gap-1">
          <RatingStars :rating="product.rating" class="h-5 space-x-1.5"/>
        </div>
        <div class="flex gap-2">
          12 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10H8.01H8ZM12 10H12.01H12ZM16 10H16.01H16ZM9 16H5C4.46957 16 3.96086 15.7893 3.58579 15.4142C3.21071 15.0391 3 14.5304 3 14V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V14C21 14.5304 20.7893 15.0391 20.4142 15.4142C20.0391 15.7893 19.5304 16 19 16H14L9 21V16Z" stroke="#24282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="flex-grow">
        <div class="h-16 text-sm mt-1 mb-2 multiline-ellipsis">
          {{product.description}}
        </div>
      </div>

      <div class="flex mb-2 justify-between">
        <span class="text-2xl text-gray-700 mr-3 font-semibold">${{product.price}}</span>
        <button class="bg-primary w-40 rounded text-sm text-white py-1 px-2 flex-shrink"
                @click="cartStore.addItem(product.id)">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RatingStars from '@/components/RatingStars.vue'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import {computed} from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})

const productStore = useProductStore()
const cartStore = useCartStore()
const product = productStore.getProductById(props.id)
</script>

<style>
</style>