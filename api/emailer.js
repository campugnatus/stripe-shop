const nodemailer = require("nodemailer")

if (!process.env.SMTP_FROM) throw "SMTP_FROM environment variable undefined"
if (!process.env.SMTP_SERVER) throw "SMTP_SERVER environment variable undefined"
if (!process.env.SMTP_PORT) throw "SMTP_PORT environment variable undefined"

const from = `"Stripe Shop" <${process.env.SMTP_FROM}>`

const emailTransport = nodemailer.createTransport({
	host: process.env.SMTP_SERVER,
	port: process.env.SMTP_PORT || 25,
	auth: process.env.SMTP_USER && {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD
	},
	secure: false,
	tls: {
		rejectUnauthorized: false
	}
})

function onSignup (email, code) {
	let info = emailTransport.sendMail({
		from, // sender address
		to: email, // list of receivers
		subject: "Email verification", // Subject line
		text: "Your code is "+code, // plain text body
		// html: "<b>Hello world?</b>", // html body
	})
}

function onOrder (email, id) {
	emailTransport.sendMail({
		from, // sender address
		to: email, // list of receivers
		subject: "Thanks for your order!", // Subject line
		text: orderNotificationText(id)
	})
}

const orderNotificationText = (id) =>

`Hello!


Thank you for making a purchase in Stripe Shop!

In case you're wondering, your Order ID is ${id}

To view your order and download the ordered products, please follow the link:

${process.env.BASE_URL}/order/${id}


We hope your stripes serve you well.

If you encounter any issues with your stripes, please let us know!


Wishing you all the best,

The Stripe Shop team
which is uh... just me
`


function onPasswordResetRequest(email, code) {
	let info = emailTransport.sendMail({
		from, // sender address
		to: email, // list of receivers
		subject: "Password reset request", // Subject line
		text: "Your password reset code is "+code, // plain text body
		// html: "<b>Hello world?</b>", // html body
	})
}

module.exports = {
	onSignup,
	onOrder,
	onPasswordResetRequest,
}