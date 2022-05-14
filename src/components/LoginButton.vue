<template>
	<Popover v-slot="{ close }" class="relative z-20">
		<PopoverOverlay class="bg-black opacity-20 fixed inset-0" />
		<PopoverButton class="group p-2" :title="userStore.shortName">
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
			<div v-if="userStore.signedIn" class="lg:pt-2 text-center w-20 truncate">{{userStore.shortName}}</div>
			<div v-else class="lg:pt-2 text-center">Sign in</div>
		</PopoverButton>

		<PopoverPanel class="absolute z-10 w-80 h-[444px] top-[calc(100%+1em)] right-2 shadow-xl bg-white rounded border">
			<section
				v-if="showing === 'signup'"
				class="h-full flex flex-col justify-between">

				<div class="flex">
					<button
						@click="showing = 'login'"
						class="w-1/2 p-4 text-xl flex justify-center items-center bg-gray-100 border-r border-b text-gray-400 hover:text-gray-500">
						Sign in
					</button>
					<h1
						class="w-1/2 p-4 text-xl flex justify-center items-center">
						Sign up
					</h1>
				</div>

				<form
					@submit.prevent="signup"
					class="p-8 space-y-3 my-auto text-sm">

					<div class="relative">
						<input
							type="text"
							v-focus
							v-model="signupForm.email"
							placeholder="Email address"
							:class="{'peer border-tomato focus:border-tomato focus:ring-tomato': signupV.email.$error}"
							class="text-sm w-full rounded border-gray-400"/>

						<div class="absolute opacity-0 peer-focus:opacity-100 -top-3 peer-focus:transition-all peer-focus:-top-full right-0 border border-red-300 rounded z-[-1] shadow-lg peer-focus:z-30">
							<div class="relative">
								<div class="absolute border border-red-300 h-3 w-3 bg-red-200 rotate-45 top-[calc(100%-6px)] z-[-1] right-3 shadow-lg"></div>
								<div class="bg-red-200 py-1 px-2 rounded">
									{{signupV.email.$errors[0]?.$message}}
								</div>
							</div>
						</div>
					</div>

					<div class="relative">
						<Popover>
							<PopoverButton class="absolute right-2 top-1/2 -translate-y-1/2">
								<InformationCircleIcon class="h-5 text-sm text-gray-300 hover:text-gray-400 text-xs"/>
							</PopoverButton>
							<transition
								enter-active-class="transition duration-200 ease-out"
								enter-from-class="translate-y-1 opacity-0"
								enter-to-class="translate-y-0 opacity-100"
								leave-active-class="transition duration-150 ease-in"
								leave-from-class="translate-y-0 opacity-100"
								leave-to-class="translate-y-1 opacity-0">
								<PopoverPanel class="rounded border border-gray-300 absolute shadow-lg top-[calc(100%+8px)] right-0 z-20">
									<div class="relative isolate">
										<div class="absolute bg-white h-3 w-3 border border-gray-300 rotate-45 top-[-6px] right-3 shadow-xl"></div>
										<div class="p-3 bg-white isolate rounded --text-white --bg-primary">
											The way you'd like us to call you in the emails we send you.
											This is also how your name will appear in the comments you leave here.
										</div>
									</div>
								</PopoverPanel>
							</transition>
						</Popover>

						<input
							type="text"
							v-model="signupForm.name"
							placeholder="Your name"
							:class="{'peer border-tomato focus:border-tomato focus:ring-tomato': signupV.name.$error}"
							class="text-sm w-full rounded border-gray-400"/>

						<div class="absolute opacity-0 peer-focus:opacity-100 -top-3 peer-focus:transition-all peer-focus:-top-full right-0 border border-red-300 rounded z-[-1] shadow-lg peer-focus:z-30">
							<div class="relative">
								<div class="absolute border border-red-300 h-3 w-3 bg-red-200 rotate-45 top-[calc(100%-6px)] z-[-1] right-3 shadow-lg"></div>
								<div class="bg-red-200 py-1 px-2 rounded">
									{{signupV.name.$errors[0]?.$message}}
								</div>
							</div>
						</div>
					</div>

					<div class="relative">
						<input
							type="password"
							v-model="signupForm.password"
							placeholder="Password"
							:class="{'peer border-tomato focus:border-tomato focus:ring-tomato': signupV.password.$error}"
							class="text-sm w-full rounded border-gray-400 z-10"/>

						<div class="absolute opacity-0 peer-focus:opacity-100 -top-3 peer-focus:transition-all peer-focus:-top-full right-0 border border-red-300 rounded z-[-1] shadow-lg peer-focus:z-30">
							<div class="relative">
								<div class="absolute border border-red-300 h-3 w-3 bg-red-200 rotate-45 top-[calc(100%-6px)] z-[-1] right-3 shadow-lg"></div>
								<div class="bg-red-200 py-1 px-2 rounded">
									{{signupV.password.$errors[0]?.$message}}
								</div>
							</div>
						</div>
					</div>

					<div class="relative">
						<input
							type="password"
							v-model="signupForm.confirm"
							placeholder="Confirm password"
							:class="{'peer border-tomato focus:border-tomato focus:ring-tomato': signupV.confirm.$error}"
							class="text-sm w-full rounded border-gray-400 z-10"/>

							<div class="absolute opacity-0 peer-focus:opacity-100 -top-3 peer-focus:transition-all peer-focus:-top-full right-0 border border-red-300 rounded z-[-1] shadow-lg peer-focus:z-30">
								<div class="relative">
									<div class="absolute border border-red-300 h-3 w-3 bg-red-200 rotate-45 top-[calc(100%-6px)] z-[-1] right-3 shadow-lg"></div>
									<div class="bg-red-200 py-1 px-2 rounded">
										{{signupV.confirm.$errors[0]?.$message}}
									</div>
								</div>
							</div>
					</div>

					<button
						type="submit"
						class="bg-primary rounded text-white py-2 p-2 w-full !mt-6">
						Create account
					</button>
				</form>
			</section>



			<section
				v-else-if="showing === 'confirm'"
				class="h-full flex items-center justify-center">

				<div class="space-y-6">
					<p class="font-pacifico text-3xl text-center">
						Almost there!
					</p>
					<p class="w-48">
						We've sent you an email with a code. Please enter the code below to confirm your email
					</p>
					<form @submit.prevent="verifyCode" class="text-center">
						<input
							type="text"
							v-model="code"
							v-focus
							:class="{'border-tomato focus:border-tomato focus:ring-tomato': codeError}"
							class="font-sigmar text-center text-4xl w-44 tracking-wide lowercase rounded"
							maxlength="4"/>
					</form>
				</div>
			</section>



			<section
				v-else-if="showing === 'welcome'"
				@click="showing = 'user'"
				class="h-full flex flex-col items-center justify-center">

				<input class="invisible h-0" v-focus/>
				<div class="space-y-20">
					<p class="font-pacifico text-4xl text-center">Welcome!</p>
					<p class="text-center">You're now signed up<br> and signed in!</p>
				</div>
			</section>





			<section v-else-if="showing === 'user'" class="h-full flex flex-col justify-between">
				<section class="flex border-b p-4 items-center w-full bg-gray-100">
					<div class="h-16 w-16 shrink-0">
						<img
							v-if="userStore.profile.picture"
							:src="userStore.profile.picture"
							class="rounded-full border-gray-300 border-4">
						<UserCircleIcon v-else class="text-tomato"/>
					</div>
					<div class="ml-4 min-w-0">
						<div class="text-sm text-gray-500">Logged in as</div>
						<div
							class="text-lg font-bold max-w-full truncate overflow-hidden"
							:title="userStore.profile.name">
							{{userStore.profile.name}}
						</div>
						<div class="text-gray-500 truncate">{{userStore.profile.email}}</div>
					</div>
				</section>
				<section class="text-lg flex justify-center">
					<div class="space-y-8 w-fit -ml-4">
						<router-link class="flex items-center hover:text-tomato" to="/orders">
							<ClipboardListIcon class="h-6 inline mr-3"/>
							<div class="text-left font-">Order history</div>
						</router-link>
						<router-link class="flex items-center hover:text-tomato" to="/cart">
							<ShoppingCartIcon class="h-6 inline mr-3"/>
							<div class="text-left font-">Shopping cart</div>
						</router-link>
						<button class="flex items-center hover:text-tomato">
							<KeyIcon class="h-6 inline mr-3"/>
							<div class="text-left font-">Reset password</div>
						</button>
					</div>
				</section>
				<section class="p-6">
					<button @click="logout(close)" class="block bg-primary rounded p-2 w-full text-white flex items-center justify-center">
						<LogoutIcon class="h-5 mr-2"/>
						Log out
					</button>
				</section>
			</section>



			<section v-else-if="showing === 'login'" class="h-full flex flex-col">
				<div class="flex">
					<h1 class="w-1/2 p-4 text-xl flex justify-center items-center">Sign in</h1>
					<button @click="showing = 'signup'" class="w-1/2 p-4 text-xl flex bg-gray-100 justify-center items-center border-l border-b text-gray-400 hover:text-gray-500">Sign up</button>
				</div>
				<form @submit.prevent="login" class="p-8 space-y-4 my-auto">
					<input
						v-model="loginForm.email"
						v-focus
						type="email" placeholder="Email address"
						:class="{'border-tomato --ring ring-red-300 focus:border-tomato focus:ring-tomato': loginErrors.email}"
						class="text-sm w-full rounded border-gray-400"/>
					<input
						v-model="loginForm.password"
						type="password"
						placeholder="Password"
						:class="{'border-tomato --ring ring-red-300 focus:border-tomato focus:ring-tomato': loginErrors.password}"
						class="text-sm w-full rounded border-gray-400"/>

					<div class="flex justify-between">
						<button type="submit" class="bg-primary rounded text-white py-1.5 p-2 w-28">Sign in</button>
						<button class="text-sm text-blue-500 px-2">Forgot password?</button>
					</div>
				</form>
				<div class="h-32 w-full bg-gray-100 mt-auto flex items-center justify-center border-t relative">
					<div class="flex justify-center items-center w-10 h-10 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border text-gray-400 text-xs">OR</div>
					<SignInWithGoogleButton class=""/>
				</div>
			</section>
		</PopoverPanel>
	</Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue'
import SignInWithGoogleButton from '@/components/SignInWithGoogleButton.vue'
import { UserCircleIcon, InformationCircleIcon, ClipboardListIcon, CogIcon, PencilIcon, ShoppingCartIcon, KeyIcon } from '@heroicons/vue/solid'
import { LogoutIcon } from '@heroicons/vue/outline'
import { useUserStore } from '@/stores/user.js'
import { showToast } from '@/plugins/toast'
import { ref, watch, reactive, computed } from 'vue'
import api from '@/api.js'

import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength, helpers, alpha } from '@vuelidate/validators'

const userStore = useUserStore()

const showing = ref("login")

userStore.init().then(() => {
	showing.value = userStore.signedIn? "user" : "login"
})



/**
 * Logout
 */

function logout (close) {
	userStore.logout()
		.then(() => {
			showToast.success("Logged out")
			showing.value = "login"
			close()
		},
		() => showToast.error("Couldn't log out"))
}






/**
 * Login
 */

const loginForm = reactive({
	email: undefined,
	password: undefined,
})

const loginErrors = reactive({
	email: undefined,
	password: undefined
})

const loginValid = computed(() => {
	for (let err of Object.values(loginErrors))
		if (err !== undefined)
			return false

	return true
})

function loginVerify () {
	// reset the errors
	Object.keys(loginErrors).forEach(key => loginErrors[key] = undefined)

	if (!loginForm.password) {
		loginErrors.password = "Please enter the password"
	}

	if (!loginForm.email) {
		loginErrors.email = "Please enter your email address"
	}
	else if (!loginForm.email.match(/\@/)) {
		loginErrors.email = "Email address doesn't look correct"
	}
}

async function login () {
	loginVerify()

	if (!loginValid.value) {
		Object.values(loginErrors).forEach(msg => msg && showToast.error(msg))
		return
	}

	userStore.login({
		email: loginForm.email,
		password: loginForm.password
	})
	.then(() => {
		showing.value = 'user'
		reset()
	})
	.catch(e => {
		if (e.response?.data === "no user") {
			showToast.error("User doesn't exist")
			loginErrors.email = "User doesn't exist"
		}
		else if (e.response?.data === "wrong password") {
			showToast.error("Incorrect password")
			loginErrors.password = "Incorrect password"
		}
		else {
			console.error("Login failed", e, e.response)
			showToast.error("Oops! Something went wrong")
		}
	})
}








/**
 * Signup
 */


const signupForm = reactive({
	email: undefined,
	name: undefined,
	password: undefined,
	confirm: undefined,
})

const signupValidators = {
	email: {
		required: helpers.withMessage(
			"Email address is required",
			required
		),
		$lazy: true,
		email: helpers.withMessage(
			"Email address doesn't look right",
			email
		),
		isUnique: helpers.withMessage(
			"User already exists",
			helpers.withAsync(async function (value) {
				if (value === '') return true
				const exists = await api.userExists(value)
				return !exists
			})
		)
	},
	name: {
		required: helpers.withMessage(
			"Please enter your name",
			required
		),
	},
	password: {
		required: helpers.withMessage(
			"Password is required",
			required
		),
		$lazy: true,
		minLength: helpers.withMessage(
			"Password is too short",
			minLength(6)
		)
	},
	confirm: {
		required: helpers.withMessage(
			"Password confirmation is required",
			required
		),
		$lazy: true,
		sameAsPassword: helpers.withMessage(
			"Passwords don't match",
			sameAs(computed(() => signupForm.password))
		)
	},
}

const signupV = useVuelidate(signupValidators, signupForm)
let token

async function signup () {
	// verify that the data is ok
	const valid = await signupV.value.$validate()

	if (!valid) {
		signupV.value.$errors.forEach(error => showToast.error(error.$message))
		return
	}

	userStore.signup({
		email: signupForm.email,
		name: signupForm.name,
		password: signupForm.password
	})

	.then(tkn => {
		token = tkn
		showing.value = "confirm"
	})

	.catch(e => {
		if (e.response && e.response.data.match(/exists/)) {
			showToast.error("User already exists")
		} else {
			console.log("Sign up failed:", e, e.response)
			showToast.error("Oops! Sign up failed")
		}
	})
}






/**
 * Email verification
 */

const code = ref()
const codeError = ref(false)

async function verifyCode () {
	userStore.verifyCode(code.value, token)

	.then(() => {
		showing.value = "welcome"
		reset()
	})

	.catch(err => {
		if (err.response?.data?.match(/code/)) {
			codeError.value = "Nope"
			showToast.error("Incorrect code")
		}
		else {
			showToast.error("Something went wrong")
		}
	})
}







/**
 * Utilities
 */

function reset () {
	clearForm(signupForm)
	clearForm(loginForm)
	signupV.value.$reset()
	code.value = undefined
	token = undefined

	function clearForm(form) {
		for (let key of Object.keys(form)) {
			form[key] = undefined
		}
	}
}


const vFocus = {
  mounted: (el) => el.focus()
}
</script>