<template>
	<Popover class="relative z-20">
		<PopoverOverlay class="bg-black opacity-20 fixed inset-0" />
		<PopoverButton class="group p-2">
			<div class="flex justify-center">
				<template v-if="userStore.signedIn">
					<img v-if="userStore.profile.picture" :src="userStore.profile.picture" class="h-10 lg:h-11 rounded-full border-transparent border-4 group-hover:border-blue-300">
					<UserCircleIcon v-else class="h-11 text-tomato"/>
				</template>

				<!-- can't use the one from the package as I want to customize the stroke-width -->
				<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 lg:h-11 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div v-if="userStore.signedIn" class="lg:pt-2 text-center w-20 overflow-ellipsis overflow-hidden whitespace-nowrap">{{userStore.shortName}}</div>
			<div v-else class="lg:pt-2 text-center">Sign in</div>
		</PopoverButton>


		<PopoverPanel>
			<section v-if="userStore.signedIn" class="absolute z-10 w-80 h-[444px] top-[calc(100%+1em)] right-2 shadow-xl bg-white rounded border flex flex-col justify-between">
				<button @click="logout" class="block bg-primary p-2 w-full text-white">logout</button>
			</section>



			<section v-else-if="showing === 'login'" class="absolute z-10 w-80 h-[444px] top-[calc(100%+1em)] right-2 shadow-xl bg-white rounded border flex flex-col">
				<div class="flex">
					<h1 class="w-1/2 p-4 text-xl flex justify-center items-center">Sign in</h1>
					<button @click.prevent.stop="showing = 'signup'" class="w-1/2 p-4 text-xl flex bg-gray-100 justify-center items-center border-l border-b text-gray-400 hover:text-gray-500">Sign up</button>
				</div>
				<div class="p-8 space-y-4 my-auto">
					<input v-model="loginCred.email" type="email" placeholder="Email address" class="text-sm w-full rounded border-gray-400" :class="{'--ring ring-tomato border-tomato': loginCred.error.email}"/>
					<input v-model="loginCred.password" type="password" placeholder="Password" class="text-sm w-full rounded border-gray-400" :class="{'--ring ring-tomato border-tomato': loginCred.error.password}"/>
					<div class="flex justify-between">
						<button @click="login" class="bg-primary rounded text-white py-1.5 p-2 w-28">Sign in</button>
						<button class="text-sm text-blue-500 px-2">Forgot password?</button>
					</div>
				</div>
				<div class="h-32 w-full bg-gray-100 mt-auto flex items-center justify-center border-t relative">
					<div class="flex justify-center items-center w-10 h-10 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border text-gray-400 text-xs">OR</div>
					<SignInWithGoogleButton class=""/>
				</div>
			</section>




			<section
				v-else-if="showing === 'signup'"
				class="absolute z-10 w-80 h-[444px] top-[calc(100%+1em)] right-2 shadow-xl bg-white rounded border flex flex-col justify-between">

				<div class="flex">
					<button
						@click.prevent.stop="showing = 'login'"
						class="w-1/2 p-4 text-xl flex justify-center items-center bg-gray-100 border-r border-b text-gray-400 hover:text-gray-500">
						Sign in
					</button>
					<h1
						@click="showing = 'signup'"
						class="w-1/2 p-4 text-xl flex justify-center items-center">
						Sign up
					</h1>
				</div>

				<form
					@submit.prevent="signup"
					class="p-8 space-y-3 my-auto text-sm">

					<input
						type="email"
						v-model="cred.email"
						placeholder="Email address"
						class="text-sm w-full rounded border-gray-400"
						:class="{'border-tomato': error.email}"/>

					<div class="relative">
						<Popover>
							<PopoverButton class="absolute right-2 top-1/2 -translate-y-1/2">
								<InformationCircleIcon class="h-5 text-sm text-gray-300 hover:text-gray-400 text-xs"/>
							</PopoverButton>
							<PopoverPanel class="bg-primary rounded text-white absolute p-3 shadow-lg top-[calc(100%+0.9em)] right-0">
								The way you'd like us to call you in the emails we send you.
								This is also how your name will appear in the comments you leave here.
							</PopoverPanel>
						</Popover>
						<input
							type="text"
							v-model="cred.name"
							placeholder="Your name"
							class="text-sm w-full rounded border-gray-400"/>
					</div>

					<input
						type="password"
						v-model="cred.password"
						placeholder="Password"
						:class="{'border-tomato': error.password}"
						class="text-sm w-full rounded border-gray-400"/>

					<input
						type="password"
						v-model="cred.confirm"
						placeholder="Confirm password"
						:class="{'border-tomato': error.confirm}"
						class="text-sm w-full rounded border-gray-400"/>

					<button
						type="submit"
						class="bg-primary rounded text-white py-1.5 p-2 w-full !mt-6">
						Create account
					</button>
				</form>
			</section>
		</PopoverPanel>
	</Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue'
import SignInWithGoogleButton from '@/components/SignInWithGoogleButton.vue'
import { UserCircleIcon, InformationCircleIcon } from '@heroicons/vue/solid'
import { useUserStore } from '@/stores/user.js'
import { showToast } from '@/plugins/toast'
import { ref, watch, reactive } from 'vue'

const userStore = useUserStore()

const showing = ref("login")






/**
 * Logout
 */

function logout () {
	userStore.logout()
		.then(() => showToast.success("Logged out"))
		.catch(() => showToast.error("Couldn't log out"))
}





/**
 * Login
 */

const loginCred = reactive({
	email: undefined,
	password: undefined,
	error: {
		email: undefined,
		password: undefined
	}
})

async function login () {
	loginCred.error.email = undefined
	loginCred.error.password = undefined

	userStore.login({
		email: loginCred.email,
		password: loginCred.password
	})
	.catch(e => {
		if (e.response && e.response.data === "wrong password") {
			showToast.error("Incorrect email or password")
			loginCred.error.email = true
			loginCred.error.password = true
		}
		else {
			console.log("login fucked up", e.response)
			showToast.error("Login failed")
		}
	})
}








/**
 * Signup
 */

const cred = reactive({
	email: "a@b.c",
	name: "Hoha Polipka",
	password: "asdf",
	confirm: "asdf",
})

const error = reactive({
	email: undefined,
	confirm: undefined
})

function signup () {
	// verify that the data is ok

	error.confirm = undefined
	error.email = undefined

	if (cred.password !== cred.confirm) {
		error.confirm = "The passwords don't match"
		showToast.error("The passwords don't match")
		return
	}

	userStore.signup({
		email: cred.email,
		name: cred.name,
		password: cred.password
	})

	.then(() =>
		showToast.success("You're now signed up and signed in!"))

	.catch(e => {
		if (e.response && e.response.data.match(/exists/)) {
			showToast.error("User already exists")
			error.email = "User already exists"
		} else {
			console.log("sign up failed:", e)
			showToast.error("Sign up failed")
		}
	})
}
</script>