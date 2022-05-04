<template>
	 <div ref="buttonContainer"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { showToast } from '@/plugins/toast'

const userStore = useUserStore()

const buttonContainer = ref(null)

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
  userStore.login({jwt: response.credential})
    .then(() => showToast.success("Successfully logged in!"))
    .catch(e => showToast.error("Login failed"))
}

</script>

<style>
</style>