<template>
  <header class="grid grid-cols-2 gap-3 lg:flex px-3 lg:px-6 lg:px-8 lg:container mx-auto mt-2 lg:mt-14 items-center" style="">

    <section class="mt-2 lg:mt-0">
      <router-link to="/" class="font-sigmar inline-block scale-90 origin-left">
        <div class="text-[26px] lg:text-4xl tracking-[5px] lg:tracking-[6px] mb-[-16px] lg:mb-[-4px] relative">
          <div class="w-2 h-52 absolute bg-orange right-[41%] bottom-[14%]"></div>
          STR<span class="invisible">I</span>PE
        </div>
        <div class="text-[34px] lg:text-5xl tracking-[8px]">
          SHOP
        </div>
      </router-link>
    </section>

    <section class="row-start-2 col-span-2 flex lg:flex-col lg:justify-between lg:ml-10 xl:ml-20 flex-shrink-0 font-roboto uppercase space-x-4 lg:space-x-0">
      <router-link class="hover:text-blue-600" to="/catalogue">catalogue</router-link>
      <router-link class="hover:text-blue-600" to="#">about</router-link>
      <router-link class="hover:text-blue-600" to="#">third one</router-link>
    </section>

    <!-- search box -->
    <section class="row-start-3 col-span-2 lg:mx-16 xl:mx-32 flex-grow flex items-center">
      <div class="relative w-full">
        <input @keyup.enter="searchCatalogue" type="text" name="search" placeholder="Search for stripes" v-model="query"
               class="lg:text-lg border border-gray-300 pl-3 lg:pl-5 pr-14 w-full focus:outline-none focus:ring-0 rounded-full focus:border-primary">
        <button @click="resetSearch" v-if="props.text" class="absolute h-full right-14 text-gray-400 hover:text-black">
          <XIcon class="h-6"/>
        </button>
        <button @click="searchCatalogue" class="absolute right-0 inset-y-0 mr-4 h-full flex items-center text-gray-400 hover:text-primary">
          <SearchIcon class="scale-x-[-1] w-7"/>
        </button>
      </div>
    </section>

    <section class="row-start-1 col-start-2 flex justify-end flex-shrink-0 lg:space-x-4">
      <button class="text-sm lg:text-base" @click="showToast.error('User login not implemented (yet)')">
        <div class="flex justify-center w-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 lg:h-11 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>            
        </div>
        <div class="lg:pt-2 text-center">Log in</div>
      </button>

      <CartButton/>
    </section>
  </header>
</template>

<script setup>
import CartButton from '@/components/CartButton.vue'
import { ref, watch } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useProductStore } from '@/stores/products'
import {} from '@heroicons/vue/solid'
import {SearchIcon, XIcon} from '@heroicons/vue/outline'
import {showToast} from '@/plugins/toast'

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