<template>
	<router-link class="text-sm lg:text-base flex flex-col justify-between items-center h-full" to="/cart">
	  <div class="flex justify-center">
	    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 lg:w-11 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  	  <!-- I would use a component from the @heroicons npm package, but I need to set the stroke-width -->
	      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
	    </svg>
	  </div>
	  <div class="lg:pt-2 w-full text-center w-[4em]">
	    <b>{{cart.totalAmount}}</b> {{ cart.totalAmount === 1 ? "item" : "items"}}
	  </div>
	</router-link>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>