const db = require('better-sqlite3')('./stripeshop.db', {
    fileMustExist: true,
    verbose: function (statement) {
        // console.log(statement)
    }
})

const products = require('../stripes.json')

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

for (let i = 0; i < products.length; i++) {
    let p = products[i]

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