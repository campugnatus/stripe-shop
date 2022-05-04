<template>
	<Popover class="relative">
		<PopoverOverlay class="bg-black opacity-30 fixed inset-0" />
		<PopoverButton class="group p-2">
			<div class="flex justify-center">
				<template v-if="userStore.signedIn">
					<img v-if="userStore.profile.picture" :src="userStore.profile.picture" class="h-10 lg:h-11 rounded-full border-transparent border-4 group-hover:border-zinc-200">
					<UserCircleIcon v-else class="h-11 text-tomato"/>
				</template>

				<!-- can't use the one from the package as I want to customize the stroke-width -->
				<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-11 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div v-if="userStore.signedIn" class="lg:pt-2 text-center">{{userStore.profile.name}}</div>
			<div v-else class="lg:pt-2 text-center">Sign in</div>
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
import { UserCircleIcon } from '@heroicons/vue/solid'
import { useUserStore } from '@/stores/user.js'
import { showToast } from '@/plugins/toast'

const userStore = useUserStore()

function logout () {
	userStore.logout()
		.then(() => showToast.success("Logged out"))
		.catch(() => showToast.error("Couldn't log out"))
}

</script>