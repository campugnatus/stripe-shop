// import stripes info and images from figma

// TODO: store the secret securely? Or just use OAuth2 instead
// 208446-68c2c832-cc21-4ad0-84a4-71c895a77859

const axios = require('axios');
const fs = require('fs');

main();

async function main () {
	let stripes = await get_stripes();
	fs.writeFileSync('stripes.json', JSON.stringify(stripes));
}


async function get_stripes() {
	let res = await axios({
		url: 'https://api.figma.com/v1/files/D5DjSlrc7xGKVYe1Ap8XSs/nodes',
		headers: {
			'X-Figma-Token': '208446-68c2c832-cc21-4ad0-84a4-71c895a77859',
		},
		params: {
			ids: ['439:1077'].join(',')
		},
	})
	
	let promises = res.data.nodes['439:1077'].document.children.map(handle_stripe_declaration);
	return await Promise.all(promises);
}


async function handle_stripe_declaration (decl) {
	let decl2 = {}
	for (let field of decl.children) {
		decl2[field.name] = field;
	}

	if (!decl2.image) {
		console.error("Stripe doesn't have an image:", decl2.title.characters)
		return;
	}

	let imageId = decl2.image.id;

	let {data} = await axios({
		url: `https://api.figma.com/v1/images/D5DjSlrc7xGKVYe1Ap8XSs`,
		headers: {
			'X-Figma-Token': '208446-68c2c832-cc21-4ad0-84a4-71c895a77859',
		},
		params: {
			ids: [imageId].join(','),
			format: 'svg'
		}
	})

	let {data: svg} = await axios({
		url: data.images[imageId],
		responseType: 'document' // ?
	})
	let filename = `${imageId}.svg`;
	fs.writeFileSync('svg/' + filename, svg);

	let stripe_obj = {
		title: decl2.title.characters,
		description: decl2.description.characters,
		rating: parseFloat(decl2.rating.characters),
		price: parseFloat(decl2.price.characters),
		tags: decl2.tags.characters.split(/,\s*/),
		img: filename
	}

	console.log(stripe_obj)
	return stripe_obj;
}