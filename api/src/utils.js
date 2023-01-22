// I've heard people say that a 'utils' module is a sign of a bad
// architecture... ¯\_(ツ)_/¯

const crypto = require('node:crypto')

const secret = process.env.SECRET
if (!secret) throw "Error: SECRET environment variable undefined"
const secret24 = crypto.scryptSync(secret, 'salt', 24)


// Create a general-purpose token: a JSON encrypted with a server-side secret

function createToken (obj) {
	if (typeof obj !== 'object')
		throw "error: createToken expected an object"

	const data = {
		data: JSON.stringify(obj).normalize(),
		issued: new Date().getTime(),
		ttl: 0,
	}
	const dataString = JSON.stringify(data).normalize()

	// initialization vector for the cipher algorithm
	const iv = crypto.randomBytes(16)
	// Once we have the key and iv, we can create and use the cipher...
	const cipher = crypto.createCipheriv('aes-192-cbc', secret24, iv)

	let encrypted = ''
	cipher.setEncoding('hex')
	cipher.on('data', (chunk) => encrypted += chunk)
	// cipher.on('end', () => console.log(encrypted))
	cipher.write(dataString)
	cipher.end()

	const token = iv.toString('hex') + '.' + encrypted
	return token
}

function decodeToken (token) {
	const [_, ivhex, encrypted] = token.match(/^(.+)\.(.+)$/)
	const iv = Buffer.from(ivhex, 'hex')

	const decipher = crypto.createDecipheriv('aes-192-cbc', secret24, iv)

	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8')

	const payload = JSON.parse(decrypted)

	// TODO: check if expired

	return JSON.parse(payload.data)
}

function gen4LetterCode() {
	const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"
	let code = ""
	code += alphabet[Math.floor(Math.random()*alphabet.length)]
	code += alphabet[Math.floor(Math.random()*alphabet.length)]
	code += alphabet[Math.floor(Math.random()*alphabet.length)]
	code += alphabet[Math.floor(Math.random()*alphabet.length)]

	return code
}

module.exports = {
	gen4LetterCode,
	createToken,
	decodeToken,
}
