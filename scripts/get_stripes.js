// import stripes info and images from figma

const usage = `

USAGE
	FIGMA_TOKEN=token
	node get_stripes.js [--svg] [<output directory>]

	--svg	also download the svgs of the stipes and put them in
			"svg" subdirectory of the output path

`

const axios = require('axios')
const fs = require('fs')
const path = require('path')

const figmaToken = process.env.FIGMA_TOKEN
if (!figmaToken) {
	console.log("Error: FIGMA_TOKEN environment variable undefined")
	process.exit(1)
}

const stripesNodeId = '439:1077'

const [getSVGs, outputDir] = parseParams()

main()








function parseParams () {
	const args = process.argv.slice(2)
	let svgs, outputDir

	if (args[0] === "--svg") {
		svgs = true
		args.shift()
	}

	outputDir = args[0]
	if (!outputDir) {
		console.log(usage)
		process.exit(1)
	}
	return [svgs, outputDir]
}


async function main () {

	console.log("Requesting the stripes' parent node...")
	let response = await axios({
		url: 'https://api.figma.com/v1/files/D5DjSlrc7xGKVYe1Ap8XSs/nodes',
		headers: {
			'X-Figma-Token': figmaToken,
		},
		params: {
			ids: [stripesNodeId].join(',')
		},
	}).catch(error => {
		console.error(
			"Couldn't get the parent node:",
			error.response ? error.response.statusText : error.code
		)
		throw error
	})
	
	let stripe_declarations = response.data.nodes[stripesNodeId].document.children;
	sort_by_position(stripe_declarations) // in place

	console.log("Parsing stripes declarations...")
	let stripe_metadata = stripe_declarations
		.map(parse_stripe_declaration)
		.filter(obj => obj !== null)


	console.log("Writing stripes metadata to disk...")
	fs.writeFileSync(
		path.resolve(outputDir, 'stripes.json'),
		JSON.stringify(stripe_metadata, null, 4)
	)


	if (getSVGs) {
		// create a directory for the SVGs if one doesn't exist yet
		fs.mkdirSync(path.resolve(outputDir, "svg"), {recursive: true})

		console.log("Requesting image URLs...")
		let id_to_metadata = stripe_metadata.reduce((acc, stripe) => {
			acc[stripe.id] = stripe
			return acc
		}, {})
		let id_to_url = await get_image_urls(id_to_metadata)

		console.log("Downloading the SVGs...")
		let id_to_promise = get_svgs(id_to_url)
		await Promise.all(Object.values(id_to_promise))

		console.log("Writing the SVGs to disk...")
		for (const [id, promise] of Object.entries(id_to_promise)) {
			let {data: svg} = await promise
			fs.writeFileSync(
				path.resolve(outputDir, "svg", `${id}.svg`),
				svg
			)
		}
	}

	console.log("All done... whew!")
}



function parse_stripe_declaration (decl) {
	let decl2 = {}
	for (let field of decl.children) {
		decl2[field.name] = field;
	}

	if (decl2.image.children.length === 0) {
		// empty declaration, skip it
		return null;
	}

	try {
		return {
			id: decl2.image.id,
			title: decl2.title.characters,
			description: decl2.description.characters,
			rating: parseFloat(decl2.rating.characters),
			price: parseFloat(decl2.price.characters),
			tags: decl2.tags.characters.split(/,\s*/),
			filename: decl2.image.id+".svg"
		}
	} catch (error) {
		console.log("Invalid declaration: ", decl2)
		throw error
	}
}


async function get_image_urls(stripes_metadata) {
	let img_ids = Object.keys(stripes_metadata)

	let response = await axios({
		url: `https://api.figma.com/v1/images/D5DjSlrc7xGKVYe1Ap8XSs`,
		headers: {
			'X-Figma-Token': figmaToken,
		},
		params: {
			ids: img_ids.join(','),
			format: 'svg'
		}
	}).catch(error => {
		if (error.response)
			console.log(
				"Couldn't get image urls:",
				error.response.statusText,
				error.response.data
			)
		else
			console.log("Couldn't get image urls:", error.code)

		throw error
	})

	if (response.data.error) {
		throw new Error(
			"Got an error trying to import images from figma:",
			response.data.error
		)
	}

	const images = response.data.images
	for (const [id, url] of Object.entries(images)) {
		if (images[id] === null) {
			throw new Error(
				"Got no URL for the stripe:",
				stripes_metadata[id].title
			)
		}
	}

	return images;
}


function get_svgs (id_to_url) {
	let id_to_promise = {}
	for (const [id, url] of Object.entries(id_to_url)) {
		id_to_promise[id] = axios({
			url: url,
			responseType: 'document' // who told you that?
		})
	}

	return id_to_promise
}

function sort_by_position(declarations) {
	declarations.sort((decl1, decl2) => {
		const {x, y} = decl1.absoluteBoundingBox
		const {x: x2, y: y2} = decl2.absoluteBoundingBox

		if (y === y2)
			return x - x2;
		else
			return y - y2;
	})	
}
