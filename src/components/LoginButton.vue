<template>
	<Popover v-if="userStore.signedIn" v-slot="{ close }" class="relative z-20">
		<PopoverButton class="group p-2" :title="userStore.shortName">
			<div class="flex justify-center">
				<img
					v-if="userStore.profile.picture"
					:src="userStore.profile.picture"
					class="h-10 lg:h-11 rounded-full border-transparent border-4 group-hover:border-blue-300">
				<UserCircleIcon
					v-else
					class="h-11 text-tomato"/>
			</div>
			<div v-if="userStore.signedIn" class="lg:pt-2 text-center w-20 truncate">{{userStore.shortName}}</div>
			<div v-else class="lg:mt-2 text-center"> Sign in </div>
		</PopoverButton>

		<transition
			enter-active-class="transition duration-200 ease-out"
			enter-from-class="-translate-y-1 opacity-0"
			enter-to-class="translate-y-0 opacity-100"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="translate-y-0 opacity-100"
			leave-to-class="-translate-y-1 opacity-0">
			<PopoverPanel class="absolute z-10 w-80 top-[calc(100%+0.6em)] right-3 shadow-xl bg-white rounded border border-gray-300">
				<!-- triangle -->
				<div class="h-6 w-6 absolute right-6 rotate-45 -top-3 bg-gray-100 border border-gray-300 z-[-1]"> </div>
				<section class="flex border-b p-3 items-center w-full bg-gray-100">
					<div class="h-16 w-16 shrink-0">
						<img
							v-if="userStore.profile.picture"
							:src="userStore.profile.picture"
							class="rounded-full border-gray-300 --border-4">
						<UserCircleIcon v-else class="text-tomato"/>
					</div>
					<div class="ml-4 min-w-0">
						<div class="text-sm text-gray-500">Logged in as</div>
						<div
							class="text-lg max-w-full truncate overflow-hidden font-bold text-gray-600"
							:title="userStore.profile.name">
							{{userStore.profile.name}}
						</div>
						<div class="text-gray-500 truncate">{{userStore.profile.email}}</div>
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

	<button v-if="!userStore.signedIn" class="group p-2" :title="userStore.shortName" @click="openModal" :disabled="userStore.loading">
		<div class="flex justify-center">
			<div :class="{'grayout before:rounded-full': userStore.loading}">
				<UserCircleOutlineIcon class="h-10 lg:h-11 text-gray-600 stroke-1"/>
			</div>
		</div>
		<div v-if="userStore.signedIn" class="lg:pt-2 text-center w-20 truncate">{{userStore.shortName}}</div>
		<div v-else class="lg:mt-2 text-center" :class="{'grayout': userStore.loading}">Sign in</div>
	</button>

	<TransitionRoot appear :show="showModal" as="template">
		<Dialog as="div" @close="closeModal" class="relative z-10 font-roboto">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0">
				<div class="fixed inset-0 bg-black/50" aria-hidden="true"></div>
			</TransitionChild>

			<div class="fixed inset-0 flex items-center justify-center p-4">
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0 scale-95"
					enter-to="opacity-100 scale-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100 scale-100"
					leave-to="opacity-0 scale-95">
					<DialogPanel class="w-80 h-[444px] shadow-xl bg-white rounded border">
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
								class="my-auto">
								<fieldset class="p-8 space-y-3" :disabled="loading" :class="{'opacity-70': loading}">
									<LoginInput
										focus
										v-model="signupForm.email"
										placeholder="Email address"
										:error="signupV.email.$errors[0]?.$message"/>

									<LoginInput
										v-model="signupForm.name"
										placeholder="Your name"
										:error="signupV.name.$errors[0]?.$message"
										info="The way you'd like us to call you in the emails we send you. This is also how your name will appear in the comments you leave here."/>

									<LoginInput
										password
										v-model="signupForm.password"
										placeholder="Password"
										:error="signupV.password.$errors[0]?.$message"/>

									<LoginInput
										password
										v-model="signupForm.confirm"
										placeholder="Confirm password"
										:error="signupV.confirm.$errors[0]?.$message"/>

									<button
										type="submit"
										:class="{'spinner': loading}"
										class="bg-primary rounded text-white py-2 p-2 w-full !mt-6">

										Create account
									</button>
								</fieldset>
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
									We've sent you an email with a code. Please enter the code below to verify your email
								</p>
								<form @submit.prevent="verifyCode" class="text-center">
									<input
										type="text"
										v-model="code"
										v-focus
										:disabled="loading"
										:class="{
											'border-tomato focus:border-tomato focus:ring-tomato': codeError,
											'opacity-50': loading
										}"
										class="h-full p-0 font-sigmar text-center text-4xl w-44 tracking-wide lowercase rounded"
										maxlength="4"/>
								</form>
							</div>
						</section>



						<section
							v-else-if="showing === 'welcome'"
							@click="closeModal"
							class="h-full flex flex-col items-center justify-center">

							<div class="space-y-20">
								<p class="font-pacifico text-4xl text-center">Welcome!</p>
								<p class="text-center">You're now signed up<br> and signed in!</p>
							</div>
						</section>





						<section v-else-if="showing==='forgot'" class="h-full flex flex-col p-8">
							<h1 class="text-2xl">Forgot your password?</h1>
							<p class="text-sm mt-6">That's okay.</p>
							<p class="text-sm mt-3">Just enter your email below and we'll send you instructions on how to reset your password.</p>
							<form @submit.prevent="requestResetEmail" class="my-auto">
								<fieldset :disabled="loading" :class="{'opacity-50': loading}">
									<LoginInput
										focus
										v-model="resetEmail"
										placeholder="Email address"
										:error="resetEmailError"/>
									<button
										type="submit"
										:class="{'spinner': loading}"
										class="w-full bg-primary text-white rounded p-2 mt-4">
										Send me email
									</button>
								</fieldset>
							</form>
							<button @click="showing='login'" class="!mt-auto self-center">
								<ArrowLeftIcon class="h-10"/>
							</button>
						</section>






						<section v-else-if="showing==='reset'" class="h-full flex flex-col p-8 justify-between">
							<h1 class="text-2xl">
								Password reset
							</h1>
							<p class="text-sm">
								We've sent you an email with a code. Please enter the code below, along with your new password.
							</p>
							<form @submit.prevent="resetPassword">
								<fieldset :disabled="loading" class="space-y-3" :class="{'opacity-50': loading}">
									<LoginInput
										focus
										v-model="resetForm.code"
										placeholder="Code from the email"
										:error="resetErrors.code"/>
									<LoginInput
										password
										v-model="resetForm.password"
										placeholder="Your new password"
										:error="resetErrors.password"/>
									<LoginInput
										password
										v-model="resetForm.confirm"
										placeholder="Confirm password"
										:error="resetErrors.confirm"/>

									<button
										type="submit"
										:class="{'spinner': loading}"
										class="w-full bg-primary text-white rounded py-1.5 p-2 !mt-4">
										Set password
									</button>
								</fieldset>
							</form>
							<button :class="{'invisible': userStore.signedIn}" @click="showing='login'" class="mt-2 self-center">
								<ArrowLeftIcon class="h-10"/>
							</button>
						</section>





						<section v-else-if="showing === 'login'" class="h-full flex flex-col">
							<div class="flex">
								<h1 class="w-1/2 p-4 text-xl flex justify-center items-center">Sign in</h1>
								<button @click="showing = 'signup'" class="w-1/2 p-4 text-xl flex bg-gray-100 justify-center items-center border-l border-b text-gray-400 hover:text-gray-500">Sign up</button>
							</div>
							<form @submit.prevent="login" class="my-auto">
								<fieldset :disabled="loading" class="p-8 space-y-4" :class="{'opacity-70': loading}">
									<LoginInput
										focus
										v-model="loginForm.email"
										placeholder="Email address"
										:error="loginErrors.email"/>

									<LoginInput
										password
										v-model="loginForm.password"
										placeholder="Password"
										:error="loginErrors.password"/>

									<div class="flex justify-between">
										<button
											type="submit"
											class="bg-primary rounded text-white py-1.5 p-2 w-28"
											:class="{'spinner': loading}">
											Sign in
										</button>
										<button type="button" @click="showing='forgot'" class="text-sm text-blue-500 px-2">Forgot password?</button>
									</div>
								</fieldset>
							</form>
							<div class="h-32 w-full bg-gray-100 -mt-auto flex items-center justify-center border-t relative">
								<div class="flex justify-center items-center w-10 h-10 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border text-gray-400 text-xs">OR</div>
								<SignInWithGoogleButton @signIn="closeModal"/>
							</div>
						</section>
					</DialogPanel>
				</TransitionChild>
			</div>
		</Dialog>
	</TransitionRoot>

</template>

<script setup>

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	PopoverOverlay,
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogTitle,
	DialogPanel,
} from '@headlessui/vue'

import {
	UserCircleIcon,
	InformationCircleIcon,
	PencilIcon,
	ArrowLeftIcon
} from '@heroicons/vue/solid'

import {
	ClipboardListIcon,
	ShoppingCartIcon,
	LogoutIcon,
	KeyIcon,
	CogIcon,
	UserCircleIcon as UserCircleOutlineIcon
} from '@heroicons/vue/outline'

import SignInWithGoogleButton from '@/components/SignInWithGoogleButton.vue'
import { useUserStore } from '@/stores/user.js'
import { showToast } from '@/plugins/toast'
import { ref, watch, reactive, computed } from 'vue'
import api from '@/api.js'

import LoginInput from '@/components/LoginInput.vue'

import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength, helpers, alpha } from '@vuelidate/validators'

const userStore = useUserStore()

const showing = ref("login")

// we use one variable for all the different loading states present here...
// let's see how that goes :)
const loading = ref(false)


const showModal = ref(false)
let formResetTimer

function closeModal () {
	showModal.value = false

	// If the user filling the form accidentally closes the modal and then
	// quickly (10sec) opens the modal back again, we don't want them to lose
	// progress. If, however, they close the modal for good thinking they've
	// cancelled the process and just forget about it, we don't want the next
	// user who happen to use the same computer to see a half-finished form
	// with some potentially sensitive data in it
	clearTimeout(formResetTimer)
	formResetTimer = setTimeout(() => {
		reset()
		showing.value = "login"
	}, 10000)
}

function openModal () {
	clearTimeout(formResetTimer)
	showModal.value = true
}




/**
 * Logout
 */

function logout (close) {
	loading.value = true

	userStore.logout()
		.then(() => {
			showToast.success("Logged out")
			showing.value = "login"
			close()
		},
		() => showToast.error("Couldn't log out"))
	.finally(() => loading.value = false)
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
		loginErrors.email = "Email address doesn't look right"
	}
}

async function login () {
	loading.value = true
	loginVerify()

	if (!loginValid.value) {
		Object.values(loginErrors).forEach(msg => msg && showToast.error(msg))
		loading.value = false
		return
	}

	userStore.login({
		email: loginForm.email,
		password: loginForm.password
	})
	.then(() => {
		closeModal()
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
		else if (e.response?.data === "password not set") {
			showToast.error("Password not set. Try signing in with Google or go the 'forgot password' route")
			loginErrors.password = "Password not set"
		}
		else {
			console.error("Login failed", e, e.response)
			showToast.error("Oops! Something went wrong")
		}
	})
	.finally(() => loading.value = false)
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
let emailVerificationToken

async function signup () {
	loading.value = true

	// verify that the data is ok
	const valid = await signupV.value.$validate()

	if (!valid) {
		signupV.value.$errors.forEach(error => showToast.error(error.$message))
		loading.value = false
		return
	}

	userStore.signup({
		email: signupForm.email,
		name: signupForm.name,
		password: signupForm.password
	})

	.then(tkn => {
		emailVerificationToken = tkn
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

	.finally(() => loading.value = false)
}






/**
 * Email verification
 */

const code = ref()
const codeError = ref(false)

async function verifyCode () {
	loading.value = true

	userStore.verifyCode(code.value, emailVerificationToken)

	.then(() => {
		reset()
		showing.value = "welcome"
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

	.finally(() => loading.value = false)
}





/**
 * Forgot password?
 */

const resetEmail = ref()
const resetEmailError = ref()
const resetEmailValid = computed(() => !resetEmailError.value)
let passwordResetToken


function verifyResetEmail () {
	resetEmailError.value = undefined

	if (!resetEmail.value) {
		resetEmailError.value = "Please enter your email address"
		return false
	}
	else if (!resetEmail.value.match(/\@/)) {
		resetEmailError.value = "Email address doesn't look right"
		return false
	}
	return true
}


async function requestResetEmail () {
	loading.value = true
	verifyResetEmail()

	if (!resetEmailValid.value) {
		showToast.error(resetEmailError.value)
		loading.value = false
		return
	}

	api.requestPasswordResetEmail(resetEmail.value)

	.then(token => {
		showToast.info("Now check your email!")
		passwordResetToken = token
		showing.value = 'reset'
	})

	.catch(e => {
		if (e.response?.data === "user doesn't exist") {
			// TODO: should the server just return the value we show to the user?
			showToast.error("User doesn't exist")
			resetEmailError.value = "User doesn't exist"
		} else {
			showToast.error("Something went wrong")
			resetEmailError.value = undefined
		}
	})

	.finally(() => loading.value = false)
}






/**
 * Reset password
 */

const resetForm = reactive({
	code: undefined,
	password: undefined,
	confirm: undefined,
})

const resetErrors = reactive({
	code: undefined,
	password: undefined,
	confirm: undefined,
})

const resetFormValid = computed(() => {
	for (let err of Object.values(resetErrors))
		if (err !== undefined)
			return false

	return true
})


function verifyResetForm () {
	Object.keys(resetErrors).forEach(key => resetErrors[key] = undefined)

	if (!resetForm.code) {
		resetErrors.code = "Please enter the code"
	}

	if (!resetForm.password) {
		resetErrors.password = "Please enter the password"
	}
	else if (resetForm.password.length < 6) {
		resetErrors.password = "Password is too short"
	}

	if (!resetForm.confirm) {
		resetErrors.password = "Please confirm the password"
	}
	else if (resetForm.password !== resetForm.confirm) {
		resetErrors.confirm = "Passwords don't match"
	}
}


async function resetPassword () {
	loading.value = true

	verifyResetForm()

	if (!resetFormValid.value) {
		Object.values(resetErrors).forEach(msg => msg && showToast.error(msg))
		loading.value = false
		return
	}

	api.resetPassword({
		token: passwordResetToken,
		code: resetForm.code,
		password: resetForm.password,
	})

	.then(() => {
		showToast.success("Your new password has been set")
		reset()
		if (userStore.signedIn) closeModal()
		else showing.value = 'login'
	})

	.catch(e => {
		if (e.response?.data === "bad code") {
			showToast.error("Incorrect code")
			resetErrors.code = "Incorrect code"
		}
		else {
			showToast.error("Something went wrong")
		}
	})

	.finally(() => loading.value = false)
}








async function changePassword (close) {
	// I don't understand why it doesn't happen automatically
	close()

	resetEmail.value = userStore.profile.email
	await requestResetEmail()
	showing.value = 'reset'
	openModal()
}




/**
 * Utilities
 */

// TODO: there would be no need for resetting the form manually if we
// refactored everything into components and just unmounted them every time.
// However, that way it would be possible to lose progress if you
// accidentally closed the modal... I dunno

function reset () {
	clearForm(signupForm)
	signupV.value.$reset()

	clearForm(loginForm)
	clearForm(loginErrors)
	emailVerificationToken = undefined

	clearForm(resetForm)
	clearForm(resetErrors)
	passwordResetToken = undefined

	code.value = undefined
	codeError.value = undefined

	resetEmailError.value = undefined
	resetEmail.value = undefined

	showing.value = "login"

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