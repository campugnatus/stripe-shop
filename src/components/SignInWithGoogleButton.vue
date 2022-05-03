<template>
	 <div ref="buttonContainer"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
// import * as jose from 'jose'
// import axios from 'axios'
import { useUserStore } from '@/stores/user.js'
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
  console.log("asdlkfj", response)

  userStore.login({jwt: response})

  // axios.post("/login", {
  //   jwt: response.credential
  // }).then(resp => {
  //   // init user data now
  // })

  // console.log("google response", response)
  // let jwks = await axios.get("https://www.googleapis.com/oauth2/v3/certs").then(resp => resp.data)
  // console.log("google jwk", jwks)
  // let googlePublicKey = await jose.importJWK(jwks.keys[1])
  // console.log("google pub key imported", googlePublicKey)

  // const { payload, protectedHeader } = await jose.jwtVerify(response.credential, googlePublicKey)
  // console.log("payload", payload)
  // const jwt = response.crenedtial
  // const decoded = jose.jwtDecrypt
  // should we decode the JWT here or on the server?
}

</script>

<style>
</style>