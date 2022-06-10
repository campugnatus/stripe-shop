const validator = require('validator')

// Not trying to reimplement the whole Joi or something... just the things
// that we need. Turns out, there's not so many of them!


const tokenRegex = /^[0-9a-f]+.[0-9a-f]+$/
const usernameRegex = /^(\p{Letter}|\p{Number}|[ ,.'-])+$/u
const freeformRegex = /^.+$/u
const productIdRegex = /^\d{3,5}:\d{3,5}$/
const fourLetterCodeRegex = /^\w{4,4}$/
const spacesRegex = /^\s*$/


// express.js middleware

function validateBody (schema) {
	return function validatorMiddleware (req, res, next) {
		let errors

		try {
			objectSchema(req.body, schema)
		} catch (e) {
			errors = e
		}

		if (errors)
			res.status(400).json(errors)
		else
			next()
	}
}

function listOf (validator) {
	return function (val) {
		const errors = []

		defined(val)
		isArray(val)

		val.forEach((item, i) => {
			try {
				validator(item)
			} catch (e) {
				errors[i] = e
			}
		})

		if (error.length)
			throw errors
	}
}

function objectSchema (val, schema) {
	const errors = {}
	for (let [key, validator] of Object.entries(schema)) {
		try {
			validator(val[key])
		}
		catch (e) {
			errors[key] = e
		}
	}

	if (Object.keys(errors).length)
		throw errors
}


function all (...validators) {
	return function (val) {
		validators.forEach(validator => validator(val))
	}
}

function optional (validator) {
	return function (val) {
		if (val === undefined)
			return
		else
			validator(val)
	}
}

function price (val) {
	defined(val)
	number(val)
	min(val, 0)
	max(val, 10000) // that's optimistic :)
}

function email (val) {
	defined(val)
	string(val)

	validator.isEmail(val) || panic("format")
}

function username (val) {
	defined(val)
	nonempty(val)
	minlen(val, 1)
	maxlen(val, 256)
	regex(val, usernameRegex)
}

function password (val) {
	defined(val)
	string(val)
	nonempty(val)
	minlen(val, 6)
	maxlen(val, 256)
}


function cartItems (val) {
	return listOf(cartItem)
}


function cartItem (val) {
	// we won't actually show these to the user, so we don't bother reporting
	// the paths yet
	defined(val)
	object(val)
	amount(val.amount)
	productId(val.productId)
	price(val.price)
}

function amount (val) {
	defined(val)
	number(val)
	min(val, 1)
	max(val, 256)
}

function jwt (val) {
	validator.isJWT(val) || panic ("format")
}

function token (val) {
	defined(val)
	string(val)
	nonempty(val)
	maxlen(val, 4096)
	regex(val, tokenRegex)
}

function fourLetterCode (val) {
	defined(val)
	string(val)
	regex(val, fourLetterCodeRegex)
}

function productId (val) {
	defined(val)
	string(val)
	regex(val, productIdRegex)
}

function reviewRating (val) {
	defined(val)
	number(val)
	oneof(val, [1, 2, 3, 4, 5])
}

function reviewText (val) {
	defined(val)
	string(val)
	nonempty(val)
	maxlen(val, 2048)
	regex(val, freeformRegex)
}


module.exports = {
	price,
	email,
	username,
	password,
	cartItem,
	amount,
	jwt,
	token,
	fourLetterCode,
	productId,
	reviewRating,
	reviewText,
	validateBody,

	all,
	defined,
	nonempty,
	min,
	max,
	number,
	string,
	object
}



// So... we make no attempt to make the error messages displayable to the end
// user "as is". No way that could be done well in the general case. So... we
// just provide some error codes for the client to deal with

function min (x, y) {
	x >= y || panic ("too small")
}

function max (x, y) {
	x < y || panic ("too big")
}

function number (x) {
	typeof x === 'number' || panic ("not a number")
}

function string (x) {
	typeof x === 'string' || panic ("not a string")
}

function object (x) {
	typeof x === 'object' || panic ("not an object")
}

function oneof (x, list) {
	list.findIndex(el => el === x) !== -1 || panic ("")
}

function minlen (x, l) {
	x.length >= l || panic ("too short")
}
function maxlen (x, l) {
	x.length < l || panic ("too long")
}

function nonempty (val) {
	spacesRegex.test(val) && panic ("empty")
}

function defined (val) {
	typeof val === 'undefined' && panic ("undefined")
}

function regex (x, re) {
	re.test(x) || panic ("regex")
}

function panic (msg) {
	// it's just that 'throw' is a statement and I want to use it inside of an
	// expression... wish the same could be done with 'return', but no...
	throw msg
}






// Validation discussion
//
// So I have questions

// 1. Do we respond with user-readable error messages, or with error codes?
//
// What's nice about them? No handling logic! Got em, showed em, done! Noice...
//
// What's wrong with them? When you try to make them look general enough, they
// lose all semblance of human speech. They start to look like compiler
// messages, and you don't want your end user to know about compilers. For
// example, here's an error message from the 'ow' validation library:
//
// Expected string `input` to have a minimum length of `5`, got `yo`
//
// Well... I'm not showing my users THAT.
//
// Instead, I would like to show something like "Password is too short",
// or "Password must be at least 6 characters long". That's how humans speak!
//
// But it would seem that this must be a concern of the viewing logic, not of
// the validating logic. Which is why we chose to respond with error codes.