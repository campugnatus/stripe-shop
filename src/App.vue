<template>
  <div class="fixed top-0 right-0 flex flex-col gap-4">
    <!-- <button @click="showTttoast" class="bg-primary text-white p-2">show toast</button> -->
    <!-- <button @click="hideTttoast" class="bg-primary text-white p-2">hide toast</button> -->
    <!-- <button @click="wsConnect" class="bg-primary text-white p-2">subscribe</button> -->
  </div>
  <router-view></router-view>
  <AuthModal/>
</template>

<script setup>
import {showToast} from '@/plugins/toast'
import api from '@/api.js'
import { eventBus } from '@/utils'

import AuthModal from '@/components/AuthModal.vue'
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





const thurds = [
  "Oh, this one...",
  "This one doesn't do anything",
  "Nothing useful, anyway",
  "Really, I just needed a third menu item",
  "I thought of making it do some fun stuff",
  "But haven't gotten around to it, yet",
  "So for now it just does this",
  "Wastes your time with a meaningless conversation",
  "On the other hand, doesn't this whole site do just that?",
  "Well, at least nobody's forcing this upon you",
  "Hopefully",
  "It's your choice whether you read it or not",
  "I suspect, though, that even if you do...",
  "It's not because you like what you're reading",
  "But rather because you want to see how it ends",
  "It's the same as when you force yourself to finish a movie you're not enjoying",
  "Even if you don't expect it to get any better",
  "Cuz you're not a quitter!",
]

function thurd() {
  showToast.info(thurds.shift())
}

eventBus.on('thurd', thurd)

</script>

<style>
</style>
