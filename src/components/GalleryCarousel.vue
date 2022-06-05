<template>
	<div class="overflow-x-auto scrollbar-off" v-carousel ref="container">
	  <section class="h-full items-center flex" ref="carousel">
	  	<slot></slot>
	  </section>
	</div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import { gsap } from "gsap"
import { vCarousel } from '@/directives/carousel'

const props = defineProps({
  initial: {
  	default: 0,
  	type: Number
  },

})
</script>

<style>
</style>