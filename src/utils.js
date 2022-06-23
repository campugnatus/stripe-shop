import {format, differenceInCalendarDays, differenceInYears } from 'date-fns'

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