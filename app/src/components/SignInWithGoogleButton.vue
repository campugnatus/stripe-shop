<template>
  <div
    :class="{'spinner before:block before:absolute before:inset-0 before:bg-gray-300 before:z-10 before:rounded': loading}"
    ref="buttonContainer">
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { showToast } from '@/plugins/toast'

const userStore = useUserStore()

const emit = defineEmits(['signIn'])

const buttonContainer = ref(null)

let loading = ref(false)


onMounted(async () => {
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    console.error("VITE_GOOGLE_CLIENT_ID environment variable undefined")
    return
  }

  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: googleSignInCallback
  })

  google.accounts.id.renderButton(buttonContainer.value, {
      theme: "outline",
      size: "large"
  })
})

async function googleSignInCallback (response) {
  loading.value = true
  userStore.loginGoogle({jwt: response.credential})
    .then(() => {
      emit('signIn')
      showToast.success("Successfully logged in!")
    })
    .catch(e => {
      showToast.error("Login failed")
    })
    .finally(() => loading.value = false)
}

</script>

<style>
</style>