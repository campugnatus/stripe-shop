<template>
	<h1 class="text-3xl">Order #{{orderId}}</h1>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import {computed} from 'vue'
const router = useRouter()
const route = useRoute()

const orderId = computed(() => route.params.id)
</script>