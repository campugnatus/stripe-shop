// import stripes info and images from figma

const usage = `
USAGE
	export FIGMA_TOKEN
	node get_stripes.js [--svg] [--force] [--verbose] <output dir>

	--force		by default the script is idempotent, i.e. it won't
				fetch anything if the data is already present. This
				option forces it to fetch anyway

	--svg		also download the svgs of the stipes and put them in
				"svg" subdirectory of the output path

	--verbose	print what is being done
`

const axios = require('axios')
const fs = require('fs')
const path = require('path')

const figmaToken = process.env.FIGMA_TOKEN
if (!figmaToken) {
	console.error("Error: FIGMA_TOKEN environment variable undefined")
	process.exit(1)
}
const stripesNodeId = '439:1077'

const params = parseParams()
main()






function verbose(...args) {
	if (params.verbose) {
		console.log(...args)
	}
}

function parseParams () {
	const args = process.argv.slice(2)
	let svgs = false, force = false, dir, verbose = false

	while (args.length > 1) {
		if (args[0] === "--svg") {
			svgs = true
		}
		else if (args[0] === "--force") {
			force = true
		}
		else if (args[0] === "--verbose") {
			verbose = true
		}
		else {
			console.error("Unrecognized option:", args[0])
			process.exit(1)
		}
		args.shift()
	}

	dir = args[0]
	if (!dir) {
		console.error("Parameter missing: output directory")
		console.log(usage)
		process.exit(1)
	}

	return {svgs, force, dir, verbose}
}


async function main () {
	let haveMetadata
	try {
		fs.accessSync(path.resolve(params.dir, 'stripes.json'), fs.constants.F_OK);
		verbose("Already have metadata")
		haveMetadata = true
	} catch (err) {
		haveMetadata = false
	}

	let haveSVGs
	try {
		fs.accessSync(path.resolve(params.dir, 'svg'), fs.constants.F_OK);
		verbose("Already have SVGs")
		haveSVGs = true
	} catch (err) {
		haveSVGs = false
	}

	const willFetchSVGs = params.svgs && (!haveSVGs || params.force)
	const willFetchMeta = !haveMetadata || params.force || willFetchSVGs

	let metadata
	if (willFetchMeta) {
		metadata = await fetchMetadata()
	}
	if (willFetchSVGs) {
		await fetchSVGs(metadata)
	}

	verbose("All done... whew!")
}


async function fetchMetadata() {
	verbose("Going to fetch stripe metadata")
	verbose("Requesting the stripes' parent node")
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

	const parent = response.data.nodes[stripesNodeId].document
	const declarations = parent.children
	sortByPosition(declarations) // in place

	verbose("Parsing stripe declarations")
	let metadatas = declarations
		.map(parseDeclaration)
		.filter(obj => obj !== null)


	verbose("Writing stripe metadata to disk")
	fs.mkdirSync(path.resolve(params.dir), {recursive: true})
	fs.writeFileSync(
		path.resolve(params.dir, 'stripes.json'),
		JSON.stringify(metadatas, null, 4)
	)
	return metadatas
}


async function fetchSVGs (metadatas) {
	verbose("Going to fetch stripe SVGs")

	// create a directory for the SVGs if one doesn't exist yet
	fs.mkdirSync(path.resolve(params.dir, "svg"), {recursive: true})

	verbose("Requesting image URLs")
	let metas = {}
	for (let stripe of metadatas) {
		metas[stripe.id] = stripe
	}
	let urls = await getImageURLs(metas)

	verbose("Downloading the SVGs")
	let promises = getSVGs(urls)
	await Promise.all(Object.values(promises))

	verbose("Writing the SVGs to disk")
	for (const [id, promise] of Object.entries(promises)) {
		let {data: svg} = await promise
		fs.writeFileSync(
			path.resolve(params.dir, "svg", `${id}.svg`),
			svg
		)
	}
}


function parseDeclaration (decl) {
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
		console.error("Invalid declaration: ", decl2)
		throw error
	}
}


async function getImageURLs(stripes_metadata) {
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
			console.error(
				"Couldn't get image urls:",
				error.response.statusText,
				error.response.data
			)
		else
			console.error("Couldn't get image urls:", error.code)

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


function getSVGs (id_to_url) {
	let id_to_promise = {}
	for (const [id, url] of Object.entries(id_to_url)) {
		id_to_promise[id] = axios({
			url: url,
			responseType: 'document' // who told you that?
		})
	}

	return id_to_promise
}


function sortByPosition(declarations) {
	declarations.sort((decl1, decl2) => {
		const {x, y} = decl1.absoluteBoundingBox
		const {x: x2, y: y2} = decl2.absoluteBoundingBox

		if (y === y2)
			return x - x2;
		else
			return y - y2;
	})	
}
