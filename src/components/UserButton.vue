<template>
	<HeaderButton
		v-if="!userStore.signedIn"
		:loading="userStore.loading"
		:title="userStore.shortName"
		@click="eventBus.emit('open-auth-modal')"
		:disabled="userStore.loading">

		<template #icon>
			<UserCircleOutlineIcon/>
		</template>

		Sign in
	</HeaderButton>

	<Popover v-if="userStore.signedIn" v-slot="{ close }" class="relative z-20">
		<PopoverButton>
			<HeaderButton :title="userStore.shortName">
				<template #icon>
					<img
						v-if="userStore.profile.picture"
						:src="userStore.profile.picture"
						class="rounded-full border-transparent border-4 group-hover:border-blue-300">
					<UserCircleIcon v-else class="text-tomato"/>
				</template>

				{{userStore.shortName}}
			</HeaderButton>
		</PopoverButton>

		<transition
			enter-active-class="transition duration-200 ease-out"
			enter-from-class="-translate-y-1 opacity-0"
			enter-to-class="translate-y-0 opacity-100"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="translate-y-0 opacity-100"
			leave-to-class="-translate-y-1 opacity-0">

			<PopoverPanel class="fixed inset-0 bottom-auto w-full sm:absolute z-10 sm:w-80 sm:top-[calc(100%+0.6em)] sm:inset-auto sm:right-3 shadow-xl bg-white rounded sm:border border-gray-300">
				<div class="h-6 w-6 absolute right-6 rotate-45 -top-3 bg-gray-100 border border-gray-300 z-[-1]">
					<!-- triangle -->
				</div>

				<section class="flex border-b p-3 items-center w-full bg-gray-100">
					<div class="h-16 w-16 shrink-0">
						<img
							v-if="userStore.profile.picture"
							:src="userStore.profile.picture"
							class="rounded-full border-gray-300 --border-4">
						<UserCircleIcon v-else class="text-tomato"/>
					</div>
					<div class="ml-4 min-w-0">
						<div class="text-sm text-gray-500">
							Logged in as
						</div>
						<div
							class="text-lg max-w-full truncate overflow-hidden font-bold text-gray-600"
							:title="userStore.profile.name">
							{{userStore.profile.name}}
						</div>
						<div class="text-gray-500 truncate text-sm">
							{{userStore.profile.email}}
						</div>
					</div>
				</section>

				<section class="grid grid-cols-2 text-sm">
					<router-link class="hover:bg-gray-100 flex items-center p-4 border-b" to="/orders">
						<ClipboardListIcon class="h-10 stroke-1 text-gray-500 inline mr-3"/>
						Order<br> history
					</router-link>
					<button disabled class="--hover:bg-gray-100 flex items-center p-4 border-b border-l">
						<CogIcon class="h-10 stroke-1 text-gray-500 inline mr-3"/>
						Settings
					</button>
					<button @click="changePassword(close)" class="hover:bg-gray-100 flex items-center p-4 text-left">
						<KeyIcon class="h-10 stroke-1 text-gray-500 inline mr-3"/>
						Change<br> password
					</button>
					<button
						@click="logout(close)"
						:class="{'opacity-70 hover:bg-transparent': loading}"
						class="hover:bg-gray-100 flex items-center p-4 border-l"
						:disabled="loading">
						<span v-if="loading" class="w-10 spinner-md spinner-dark mr-3"></span>
						<LogoutIcon v-else class="h-10 stroke-1 text-gray-500 mr-3"/>
						Log out
					</button>
				</section>

			</PopoverPanel>
		</transition>
	</Popover>
</template>

<script setup>

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	PopoverOverlay,
} from '@headlessui/vue'

import {
	UserCircleIcon,
	PencilIcon,
} from '@heroicons/vue/solid'

import {
	ClipboardListIcon,
	LogoutIcon,
	KeyIcon,
	UserCircleIcon as UserCircleOutlineIcon,
	CogIcon,
} from '@heroicons/vue/outline'

import { ref, watch, reactive, computed } from 'vue'

import { showToast } from '@/plugins/toast'
import { eventBus } from '@/utils'
import { useUserStore } from '@/stores/user.js'
import HeaderButton from '@/components/HeaderButton.vue'

const userStore = useUserStore()
const loading = ref(false)


/**
 * Logout
 */

function logout (close) {
	loading.value = true

	userStore.logout().then(() => {
		showToast.success("Logged out")
		close()
	})
	.catch(() => showToast.error("Couldn't log out"))
	.finally(() => loading.value = false)
}



async function changePassword (close) {
	// I don't understand why it doesn't happen automatically
	close()

	eventBus.emit('open-auth-modal', 'change password')
}
</script>