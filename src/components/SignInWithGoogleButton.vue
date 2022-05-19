<template>
  <div
    :class="{'spinner before:block before:absolute before:inset-0 before:bg-gray-300 before:z-10 before:rounded': loading}"
    ref="buttonContainer">
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { showToast } from '@/plugins/toast'

const userStore = useUserStore()

const emit = defineEmits(['signIn'])

const buttonContainer = ref(null)

let loading = ref(false)

onMounted(async () => {
  google.accounts.id.initialize({
    client_id: "464350742513-rv3421qgq91ugsn72g1busodgehjol0p.apps.googleusercontent.com",
    callback: googleSignInCallback
  })

  google.accounts.id.renderButton(buttonContainer.value, {
      theme: "outline",
      size: "large"
  })
})

async function googleSignInCallback (response) {
  loading.value = true
  userStore.login({jwt: response.credential})
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