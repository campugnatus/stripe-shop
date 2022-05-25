import {format, differenceInCalendarDays, differenceInYears } from 'date-fns'

export function formatDate (timestamp) {
	const date = new Date(timestamp)
	const now = new Date()

	if (differenceInCalendarDays(now, date) === 0)
		return "Today, " + format(date, 'hh:mm:ss aaa')

	else if (differenceInCalendarDays(now, date) === 1)
		return "Yesterday, " + format(date, 'hh:mm aaa')

	else if (differenceInYears(now, date) < 1)
		return format(date, 'MMM do, hh:mm aaa')

	else
		return format (date, 'MMM do, yyyy')
}