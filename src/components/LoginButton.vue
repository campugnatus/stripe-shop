<template>
	<Popover class="relative">
	  <PopoverOverlay class="bg-black opacity-30 fixed inset-0" />
	  <PopoverButton class="flex flex-col justify-between items-center h-full">
	    <div class="flex justify-center w-20 scale-x-[-1]">
    	  <img v-if="userStore.signedIn" :src="userStore.profile.picture" class="h-10 rounded-full border-2 border-gray-400">
	      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 lg:h-11 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
	      </svg>
	    </div>
	    <div v-if="userStore.signedIn" class="--lg:pt-2 text-center">{{userStore.profile.name}}</div>
	    <div v-else class="lg:pt-2 text-center">Log in</div>
	  </PopoverButton>

	  <PopoverPanel class="absolute z-10 w-72 h-96 top-[calc(100%+1em)] right-2 shadow-xl p-4 bg-white rounded border flex flex-col gap-4 items-center justify-center">
	    <SignInWithGoogleButton/>
	    <button class="block bg-primary p-2 text-white" @click="userStoreInit">init</button>
	    <button class="block bg-primary p-2 text-white" @click="setcookie">set</button>
	    <button class="block bg-primary p-2 text-white" @click="logout">logout</button>
	  </PopoverPanel>
	</Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue'
import SignInWithGoogleButton from '@/components/SignInWithGoogleButton.vue'
import { useUserStore } from '@/stores/user.js'
import axios from 'axios'

const userStore = useUserStore()

function userStoreInit() {
	userStore.init()
}

function logout () {
	userStore.logout()
}

</script>