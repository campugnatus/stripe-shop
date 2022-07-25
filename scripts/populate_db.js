const usage = `
USAGE
    node populate_db.js /path/to/database.db /path/to/stripes.json
`

const dbPath = process.argv[2]
const stripesPath = process.argv[3]
const fs = require('fs')

if (!dbPath || !stripesPath) {
    console.log(usage)
    process.exit(1)
}

if (!fs.existsSync(dbPath)) {
    console.log(`File doesn't exist: ${dbPath}`)
}

if (!fs.existsSync(stripesPath)) {
    console.log(`File doesn't exist: ${stripesPath}`)
}







const db = require('better-sqlite3')(dbPath, {
    fileMustExist: true,
    verbose: function (statement) {
        // console.log(statement)
    }
})

const products = JSON.parse(fs.readFileSync(stripesPath))




const insertProduct = db.prepare(`
    INSERT OR IGNORE
    INTO product
    VALUES ($id, $title, $description, $price, $filename, $place)
`)

const insertTag = db.prepare(`
    INSERT OR IGNORE
    INTO tag
    VALUES (?)
`)

const insertTagProduct = db.prepare(`
    INSERT OR IGNORE
    INTO tag_product_bridge
    VALUES ($tag_id, $product_id)
`)

const insertFTS = db.prepare(`
    INSERT OR IGNORE INTO product_fts
    VALUES (
        $id,
        $title,
        $description,
        $tags
    )
`)

console.log(`Going to populate the DB with ${products.length} products...`)

db.transaction(() => {
    for (let i = 0; i < products.length; i++) {
        createProduct(products[i], i)
    }
})()

console.log("OK done")


function createProduct (p, i) {

    //
    // insert the product itself
    //

    insertProduct.run({
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        filename: p.filename,
        place: i
    })

    //
    // insert the tags
    //

    for (let tag of p.tags) {
        insertTag.run(tag)
    }

    //
    // insert tag to product relations
    //

    for (let tag of p.tags) {
        insertTagProduct.run({
            tag_id: tag,
            product_id: p.id
        })
    }

    //
    // insert the product into the full-text search virtual table
    //

    insertFTS.run({
        id: p.id,
        title: p.title,
        description: p.description,
        tags: p.tags.join(" ")
    })
}