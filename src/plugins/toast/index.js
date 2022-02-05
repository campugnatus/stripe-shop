import {h, render, ref, reactive} from 'vue'
import ToastContainer from './ToastContainer.vue'

const types = {
	NOTIFICATION: "info",
	ERROR:        "error",
	ALERT:        "alert",
	SUCCESS:      "success"
}

export const toasts = reactive({
	freeId: 0,
	list: [
		/*{
			id: int,
			message: "Hello :)",
			type: "info" | "alert" | "error" | "success"
		}*/
	]
})

// We try to mitigate the toast animation's refusal to behave by pushing
// toasts to the screen at most as frequently as it takes the column of
// toasts to fall down following the removal of a toast from the column.
//
// Or, to paraphrase... We hide the animation's problems by not allowing
// toasts to appear on the screen (and thus leave the screen) in too quick of
// a succession.
//
// This delay must be at least as long as the longest single animation of the
// toast, otherwise all goes to shit.
const DELAY_MS = 650

let looping = false

// The queue to buffer the toasts before finally pushing them to the screen
const toastQueue = []

function popQueue() {
	if (toastQueue.length === 0) {
		looping = false
		return
	}

	toasts.list.unshift(toastQueue.pop())

	looping = true
	setTimeout(popQueue, DELAY_MS) // async loop
}


// showToast creates a new toast and puts it in the queue to be processed by
// popQueue. It also calls popQueue if there isn't one looping already

export function showToast ({message, type = "info"}) {
	const id = toasts.freeId++

	toastQueue.push({id, message, type})
	if (!looping) popQueue()
	// toasts.list.push({id, message, type})

	// return a function the caller can call to remove the toast
	return () => removeToast(id)
}

// shorthands
showToast.error = (message) => showToast({type: "error", message})
showToast.info = (message) => showToast({type: "info", message})
showToast.alert = (message) => showToast({type: "alert", message})
showToast.success = (message) => showToast({type: "success", message})


export function removeToast (id) {
	const i = toasts.list.findIndex(toast => toast.id === id)
	if (i !== -1)
		toasts.list.splice(i, 1)

	const j = toastQueue.findIndex(toast => toast.id === id)
	if (j !== -1)
		toastQueue.splice(j, 1)
}


// plugin

export default {
	install: (app, options) => {
		const vNode = h(ToastContainer, {} /* props */, {} /* slots */)
		render(vNode, document.body)

		app.provide('showToast', showToast)
	}
}