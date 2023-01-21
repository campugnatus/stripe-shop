<template>
  <header class="grid grid-cols-2 gap-3 lg:flex px-3 lg:px-6 lg:px-8 max-w-screen-xl mx-auto mt-2 lg:mt-14 items-center" style="">

    <section class="mt-2 lg:mt-0 flex">
      <router-link to="/" class="block w-28 lg:w-36 h-10 lg:h-16 relative">
        <img src="/images/logo/logo-top.svg" class="absolute w-full bottom-0">
      </router-link>
    </section>

    <section class="row-start-2 col-span-2 flex lg:flex-col lg:justify-around lg:ml-10 xl:ml-20 flex-shrink-0 font-roboto text- space-x-4 lg:space-x-0">
      <router-link class="" to="/catalogue">catalogue</router-link>
      <router-link class="" to="/about">about</router-link>
      <button @click="eventBus.emit('thurd')" class="text-left">third one</button>
    </section>

    <!-- search box -->
    <section class="row-start-3 col-span-2 lg:mx-16 xl:mx-32 flex-grow flex items-center">
      <div class="relative w-full">
        <input @keyup.enter="searchCatalogue" type="text" name="search" placeholder="Search for stripes" v-model="query"
               class="lg:text-lg border border-gray-300 pl-3 lg:pl-5 pr-14 w-full focus:outline-none focus:ring focus:ring-gray-200 rounded-full focus:border-gray-400">
        <button @click="resetSearch" v-if="props.text" class="absolute h-full right-14 text-gray-400 hover:text-black">
          <XIcon class="h-6"/>
        </button>
        <button @click="searchCatalogue" class="absolute right-0 inset-y-0 mr-4 h-full flex items-center text-gray-400 hover:text-primary">
          <SearchIcon class="scale-x-[-1] w-7"/>
        </button>
      </div>
    </section>

    <section class="row-start-1 col-start-2 flex justify-end flex-shrink-0 lg:space-x-4">
      <UserButton/>
      <CartButton/>
    </section>
  </header>
</template>

<script setup>
import CartButton from '@/components/CartButton.vue'
import UserButton from '@/components/UserButton.vue'
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useProductStore } from '@/stores/products'
import {} from '@heroicons/vue/solid'
import {SearchIcon, XIcon} from '@heroicons/vue/outline'
import {showToast} from '@/plugins/toast'
import { eventBus } from '@/utils'

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const props = defineProps({
  text: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['reset'])


const query = ref(props.text)
watch(() => props.text, () => query.value = props.text)

function searchCatalogue () {
  router.push({
    path: "/catalogue",
    query: {
      search: query.value
    }
  })
}

function resetSearch () {
  emit('reset')
}

</script>

<style>
</style>