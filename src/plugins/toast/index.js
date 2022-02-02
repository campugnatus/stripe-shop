import {h, render, ref} from 'vue'
import ToastAlert from './ToastAlert.vue'

export const show = ref(false)
export const type = ref("success")
export const message = ref("")

export function showToast (opts) {
	console.log("showToast")
	show.value = true
	message.value = opts.message
	type.value = opts.type || "success"

	return () => show.value = false
}

export default {
	install: (app, options) => {
		const vNode = h(ToastAlert, {} /* props */, {} /* slots */)
		render(vNode, document.body)

		app.provide('showToast', showToast)
	}
}