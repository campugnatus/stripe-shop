<template>
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

			<div class="fixed inset-0 flex items-center justify-center">
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
										:error="signupErrors.email"/>

									<LoginInput
										v-model="signupForm.name"
										placeholder="Your name"
										:error="signupErrors.name"
										info="The way you'd like us to call you in the emails we send you. This is also how your name will appear in the comments you leave here."/>

									<LoginInput
										password
										v-model="signupForm.password"
										placeholder="Password"
										:error="signupErrors.password"/>

									<LoginInput
										password
										v-model="signupForm.confirm"
										placeholder="Confirm password"
										:error="signupErrors.confirm"/>

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
										v-model="verificationForm.code"
										v-focus
										:disabled="loading"
										:class="{
											'border-tomato focus:border-tomato focus:ring-tomato': verificationErrors.code,
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
										v-model="forgotForm.email"
										placeholder="Email address"
										:error="forgotErrors.email"/>
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
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogTitle,
	DialogPanel,
} from '@headlessui/vue'

import {
	InformationCircleIcon,
	ArrowLeftIcon
} from '@heroicons/vue/solid'

import {} from '@heroicons/vue/outline'
import { ref, watch, reactive, computed } from 'vue'

import api from '@/api.js'
import { eventBus } from '@/utils'
import { showToast } from '@/plugins/toast'
import { useUserStore } from '@/stores/user.js'
import { onSubmitWrapper } from '@/utils'

import SignInWithGoogleButton from '@/components/SignInWithGoogleButton.vue'
import LoginInput from '@/components/LoginInput.vue'






const loading = ref(false)
const showing = ref() // which screen to show
const userStore = useUserStore()






eventBus.on('open-auth-modal', e => {
	if (e === 'change password') {
		forgotForm.email = userStore.profile.email
		requestResetEmail()
		showing.value = 'reset'
	}
	else
		showing.value = 'login'

	openModal()
})

const showModal = ref(false)
let formResetTimer

function openModal () {
	clearTimeout(formResetTimer)
	showModal.value = true
}

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

const login = onSubmitWrapper({
	form: loginForm,
	errors: loginErrors,
	loading,

	onSubmit: () =>
		userStore.loginPassword({
			email: loginForm.email,
			password: loginForm.password
		})
		.then(() => {
			closeModal()
			reset()
		})
})






/**
 * Signup
 */


const signupForm = reactive({
	email: undefined,
	name: undefined,
	password: undefined,
	confirm: undefined,
})

const signupErrors = reactive({
	email: undefined,
	name: undefined,
	password: undefined,
	confirm: undefined,
})

let emailVerificationToken


const signup = onSubmitWrapper({
	form: signupForm,
	errors: signupErrors,
	loading,

	onSubmit: () =>
		userStore.signup({
			email: signupForm.email,
			name: signupForm.name,
			password: signupForm.password,
			confirm: signupForm.confirm,
		})
		.then(tkn => {
			emailVerificationToken = tkn
			showing.value = "confirm"
		})
})





/**
 * Email verification
 */

const verificationForm = reactive({
	code: undefined
})

const verificationErrors = reactive({
	code: undefined
})

const verifyCode = onSubmitWrapper({
	form: verificationForm,
	errors: verificationErrors,
	loading,

	onSubmit: () =>
		userStore
		.verifyCode(verificationForm.code, emailVerificationToken)
		.then(() => {
			reset()
			showing.value = "welcome"
		})
})






/**
 * Forgot password?
 */


const forgotForm = reactive({
	email: undefined
})

const forgotErrors = reactive({
	email: undefined
})

let passwordResetToken

const requestResetEmail = onSubmitWrapper({
	form: forgotForm,
	errors: forgotErrors,
	loading,

	onSubmit: () =>
		api.requestPasswordResetEmail(forgotForm.email)
		.then(token => {
			showToast.info("Now check your email!")
			passwordResetToken = token
			showing.value = 'reset'
		})
})





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

const resetPassword = onSubmitWrapper({
	form: resetForm,
	errors: resetErrors,
	loading,

	onSubmit: () =>
		api.resetPassword({
			token: passwordResetToken,
			code: resetForm.code,
			password: resetForm.password,
			confirm: resetForm.confirm
		})
		.then(() => {
			showToast.success("Your new password has been set")
			reset()
			if (userStore.signedIn) closeModal()
			else showing.value = 'login'
		})
})






/**
 * Utilities
 */

// TODO: there would be no need for resetting the form manually if we
// refactored everything into components and just unmounted them every time.
// However, that way it would be possible to lose progress if you
// accidentally closed the modal... I dunno

function reset () {
	clearForm(signupForm)
	clearForm(signupErrors)

	clearForm(loginForm)
	clearForm(loginErrors)

	clearForm(verificationForm)
	clearForm(verificationErrors)
	emailVerificationToken = undefined

	clearForm(resetForm)
	clearForm(resetErrors)
	passwordResetToken = undefined

	clearForm(forgotForm)
	clearForm(forgotErrors)

	showing.value = "login"
}


function clearForm(form) {
	for (let key of Object.keys(form)) {
		form[key] = undefined
	}
}

const vFocus = {
  mounted: (el) => el.focus()
}
</script>