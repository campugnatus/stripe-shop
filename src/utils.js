import {format, differenceInCalendarDays, differenceInYears } from 'date-fns'
import { showToast } from '@/plugins/toast'

export function formatDate (timestamp) {
	const date = new Date(timestamp)
	const now = new Date()

	if (differenceInCalendarDays(now, date) === 0)
		return "Today, " + format(date, 'HH:mm:ss')

	else if (differenceInCalendarDays(now, date) === 1)
		return "Yesterday, " + format(date, 'HH:mm')

	else if (differenceInYears(now, date) < 1)
		return format(date, 'MMM do, HH:mm')

	else
		return format (date, 'MMM do, yyyy')
}




export function formatDateShort (timestamp) {
	const date = new Date(timestamp)
	const now = new Date()

	if (differenceInCalendarDays(now, date) === 0)
		return "Today, " + format(date, 'HH:mm')

	else if (differenceInCalendarDays(now, date) === 1)
		return "Yesterday, " + format(date, 'HH:mm')

	else if (differenceInYears(now, date) < 1)
		return format(date, 'MMM do')

	else
		return format (date, 'MMM do, yyyy')
}




export function formatPrice (float) {
	if (float === undefined)
		return undefined

	return Number(float).toFixed(2)
}






const errorMsgs = {
	"name": {
		"undefined":        "Please enter your name",
		"empty":            "Please enter your name",
		"too short":        "Looks like too short of a name",
		"too long":         "Come on, your name can't possibly be that long",
		"regex":            "Name contains forbidden characters"
	},
	"email": {
		"undefined":        "Please enter your email address",
		"empty":            "Please enter your email address",
		"user exists":      "User already exists",
		"format":           "Email address doesn't look right",
		"no user":          "User doesn't exist",
	},
	"password": {
		"undefined":        "Please enter your password",
		"empty":            "Please enter your password",
		"too short":        "Password is too short",
		"too long":         "Alright, that's too much",
		"password not set": "Password no set. Try signing in with Google or going the 'forgot password' route",
		"wrong password":   "Incorrect password"
	},
	"confirm": {
		"undefined":        "Please confirm your password",
		"no match":         "Passwords don't match"
	},
	"code": {
		"undefined":        "Please enter the code we've sent you",
		"regex":            "Incorrect code",
		"wrong code":       "Incorrect code",
	}
}


function handleFormErrors (err, model) {
	for (let [field, short] of Object.entries(err)) {
		const msg = errorMsgs[field][short]
		model[field] = msg
		showToast.error(msg)
	}
}

function clearErrors(obj) {
	for (let key of Object.keys(obj)) {
		obj[key] = undefined
	}
}

export function onSubmitWrapper ({form, errors, loading, onSubmit}) {
	return function (...args) {
		loading.value = true
		clearErrors(errors)

		onSubmit(...args)
		.catch(e => {
			if (e.response?.data)
				handleFormErrors(e.response.data, errors)
			else {
				throw e
			}
		})
		.catch(e => {
			showToast.error("Oops! Something went wrong...")
			console.error(e)
		})
		.finally(() => loading.value = false)
	}
}