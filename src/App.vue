<template>
  <div class="fixed top-0 right-0 flex flex-col gap-4">
    <!-- <button @click="showTttoast" class="bg-primary text-white p-2">show toast</button> -->
    <!-- <button @click="hideTttoast" class="bg-primary text-white p-2">hide toast</button> -->
    <!-- <button @click="wsConnect" class="bg-primary text-white p-2">subscribe</button> -->
  </div>
  <router-view></router-view>
</template>

<script setup>
import {showToast} from '@/plugins/toast'
import api from '@/api.js'

function wsConnect () {
  api.subscribe("order", '1644421018974-7259', (m) => {
    console.log("MESSAGE!", m)
  })
}

let hides = []
let types = ["error", "info", "alert", "success"]
let messages = [
  "Checkout successful!",
  "Oh no, shit happened! Quickly, do something!",
  "You know, shit always happens. There isn't anything you can do about it, really",
  "I REFUSE to admit that shit is happening right now. I'll do anything in my power to continue denying it!"
]
function showTttoast() {
  let fn = showToast({
    message: messages[Math.round(Math.random()*3)],
    type: types[Math.round(Math.random()*3)]
  })
  hides.push(fn)
}

function hideTttoast() {
  hides.shift()()
}

</script>

<style>
</style>
