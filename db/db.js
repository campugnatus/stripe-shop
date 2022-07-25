const crypto = require('crypto')
const path = require('path')

const dbPath = path.resolve(process.env.DB_FILE)

const db = require('better-sqlite3')(dbPath, {
    fileMustExist: true,
    verbose: function (statement) {
        // console.log(statement)
    }
})





const stmtGetProduct = db.prepare(`
    SELECT
        p.id, p.title, p.description, p.price, p.filename,
        r.rating, r.nratings, r.nreviews
    FROM product p LEFT JOIN rating r ON p.id = r.product_id
    WHERE id = ?
`)

const stmtGetTags = db.prepare(`
    SELECT tag_id
    FROM tag_product_bridge
    WHERE product_id = ?
`).pluck(true)

// TODO: do we need to load tags every time? We only need to show them on the
// product page (not in the catalogue). Maybe just fetch them explicitly?
// It's especially relevant when loading many products at once (e.g. for the
// catalogue), as it makes us run a separate query for each product, while
// in the absense of tags we could fetch a product in a single query

const getProduct = db.transaction((productId) => {
    const p = stmtGetProduct.get(productId)
    if (!p) return undefined

    p.tags = stmtGetTags.all(productId)

    return p
})







// this is just... gross

const searchProducts =
    db.transaction(({words, from, to, sort, colors, shapes, number, tags}) => {

    const sortBy = {
        "default": "p.place",
        "price-ascend": "p.price asc",
        "price-descend": "p.price desc",
        "rating-descend": "r.rating desc"
    }[sort] || "p.place"


    // substitute the right number of placeholders into the query, e.g. if we
    // give it a list of two, it will substitute (?, ?)... it's a mess, really
    const filter = (list) => {
        return `
            EXISTS (
                SELECT *
                FROM tag_product_bridge
                WHERE
                    product_id = p.id
                    AND tag_id IN (${list.map(_ => "?").join(",")})
            )
        `
    }

    const search = db.prepare(`
        WITH
            searched as (${
                words && words.length ? `
                    SELECT *
                    FROM product_fts f JOIN product p ON p.id = f.id
                    WHERE product_fts MATCH $searchTerms
                ` : `
                    SELECT * FROM product
                `
            }),

            filtered as (
                SELECT id, row_number() over (order by ${sortBy}) as row
                FROM searched p LEFT JOIN rating r ON p.id = r.product_id
                WHERE
                    ${shapes? filter(shapes) : "TRUE"}
                    AND
                    ${colors? filter(colors) : "TRUE"}
                    AND
                    ${number? filter(number) : "TRUE"}
                    AND
                    ${tags? filter(tags) : "TRUE"}
            ),

            sliced as (
                SELECT * FROM filtered
                ORDER BY row
                LIMIT $limit OFFSET $offset
            ),

            prepended as (
                SELECT count(*) as id, 0 as row FROM filtered
                UNION
                SELECT * FROM sliced
            )

        SELECT id from prepended
        ORDER BY row
    `)

    const found = search.pluck(true).all(
        shapes || [],
        colors || [],
        number || [],
        tags   || [],
        {
            searchTerms: words,
            limit: to-from,
            offset: from
        }
    )

    const total = found[0]
    const productIds = found.slice(1)

    // can't get all the products in a single query, as getting each of them
    // requires several queries (getting tags, specifically)
    const products = {}
    for (let id of productIds)
        products[id] = getProduct(id)

    return {
        order: productIds,
        products,
        more: total > to
    }
})








const stmtGetReviews = db.prepare(`
    SELECT
        r.id, r.user_id as userId, r.product_id as productId,
        r.text, r.rating, r.date, r.edited,
        u.name as username, u.picture as userpic

    FROM review r JOIN user u ON r.user_id = u.id
    WHERE product_id = ?
`)

function getReviews (productId) {
    const reviews = stmtGetReviews.all(productId)
    return reviews
}






const stmtCreateReview = db.prepare(`
    INSERT INTO review
        (product_id, user_id, rating, text, date)
    VALUES ($productId, $userId, $rating, $text, $date)
`)

const stmtEditReview = db.prepare(`
    UPDATE review
    SET rating = $rating, text = $text, edited = $edited
    WHERE product_id = $productId AND user_id = $userId
`)

// I feel like there ought to be a more direct way to do that
const stmtReviewExists = db.prepare(`
    SELECT count(*)
    FROM review
    WHERE product_id = $productId AND user_id = $userId
`).pluck(true)


const saveReview = db.transaction((productId, userId, rating, text) => {
    if (stmtReviewExists.get({productId, userId}))
        stmtEditReview.run({
            productId,
            userId,
            rating,
            text,
            edited: Date.now()
        })
    else
        stmtCreateReview.run({
            productId,
            userId,
            rating,
            text,
            date: Date.now()
        })
})






const stmtGetCartId = db.prepare(`
    SELECT id
    FROM cart
    WHERE user_id = ?
`).pluck(true)

const stmtGetCartItems = db.prepare(`
    SELECT product_id as productId, amount
    FROM cart_item
    WHERE cart_id = ?
`)

const getUserCart = db.transaction((userId) => {
    const cartId = stmtGetCartId.get(userId)
    const items = stmtGetCartItems.all(cartId)
    return {
        items
    }
})






const stmtDeleteCartItems = db.prepare(`
    DELETE FROM cart_item
    WHERE cart_id = ?
`)

const stmtInsertCartItem = db.prepare(`
    INSERT INTO cart_item
        (cart_id, product_id, amount)
    VALUES (?, ?, ?)
`)

// TODO: I guess in the relational model it would be a better fit to make
// separate events for adding an item, removing an item, and so forth...

const saveCart = db.transaction((userId, items) => {
    const cartId = stmtGetCartId.get(userId)

    // Delete all the previous items
    stmtDeleteCartItems.run(cartId)

    // And insert the new ones, instead
    for (let item of items) {
        stmtInsertCartItem.run(cartId, item.productId, item.amount)
    }
})







const stmtGetUser = db.prepare(`
    SELECT id, name, email, picture
    FROM user
    WHERE id = ?
`)

const stmtOrderIds = db.prepare(`
    SELECT id
    FROM shop_order
    WHERE user_id = ?
`)

const getUser = db.transaction((userId) => {
    const user = stmtGetUser.get(userId)

    if (!user) return undefined

    // TODO: do we really need to send the list of order ids? Maybe just make
    // fetchUserOrders endpoint to fetch them all?
    const orderIds = stmtOrderIds.pluck(true).all(userId)
    user.orders = orderIds

    return user
})






const stmtFindUserIdByEmail = db.prepare(`
    SELECT id
    FROM user
    WHERE email = ?
`).pluck(true)

function findUserByEmail (email) {
    const userId = stmtFindUserIdByEmail.get(email)
    return getUser(userId)
}





const stmtCreateUser = db.prepare(`
    INSERT OR IGNORE
    INTO user (name, email, picture, hash)
    VALUES (?, ?, ?, ?)
`)

const stmtCreateCart = db.prepare(`
    INSERT OR IGNORE
    INTO cart (user_id)
    VALUES (?)
`)

const createUser = db.transaction(({email, picture, name, password}) => {
    const info = stmtCreateUser.run(
        name,
        email,
        picture,
        password? hashPassword(password) : null
    )
    const userId = info.lastInsertRowid

    stmtCreateCart.run(userId)

    return getUser(userId)
})








function hashPassword (password) {
    password = password.normalize()

    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.scryptSync(password, salt, 64).toString("hex")

    return hash + "." + salt
}

function checkPassword(password, digest) {
    password = password.normalize()

    const [_, hash, salt] = digest.match(/^(.+)\.(.+)$/)
    const hash2 = crypto.scryptSync(password, salt, 64).toString("hex")

    return hash2 === hash
}

const stmtGetUserHash = db.prepare(`
    SELECT hash
    FROM user
    WHERE id = ?
`).pluck(true)

const stmtUserSetHash = db.prepare(`
    UPDATE user
    SET hash = $hash
    WHERE id = $userId
`)

function userSetPassword (userId, password) {
    const hash = hashPassword(password)
    stmtUserSetHash.run({userId, hash})
}

function userCheckPassword (userId, password) {
    const hash = stmtGetUserHash.get(userId)
    return checkPassword(password, hash)
}

function userHasPassword (userId) {
    const hash = stmtGetUserHash.get(userId)
    return !!hash
}







// Programming a relational database feels like my data got blown the hell up
// all over the database making me reassemble it piece by piece back together
// again every time I need to take a look at it.

const getOrder = db.transaction((orderId) => {
    const order = db
          .prepare(`SELECT * FROM shop_order WHERE id = ?`)
          .get(orderId)

    const items = db
          .prepare(`SELECT product_id as productId, price, amount FROM order_item WHERE order_id = ?`)
          .all(orderId)

    const updates = db
          .prepare(`SELECT status, date FROM order_update WHERE order_id = ?`)
          .all(orderId)

    order.items = items
    order.status = updates

    return order
})






const stmtCreateOrder = db.prepare(`
    INSERT INTO shop_order (id, user_id, email)
    VALUES (?, ?, ?)
`)

const stmtInsertOrderItem = db.prepare(`
    INSERT INTO order_item (order_id, product_id, amount, price)
    VALUES (
        $orderId,
        $productId,
        $amount,
        (SELECT price FROM product WHERE id = $productId)
    )
`)

const stmtSetOrderPrice = db.prepare(`
    UPDATE shop_order
    SET price = (
        SELECT sum(price)
        FROM order_item i
        WHERE i.order_id = $orderId
    )
    WHERE id = $orderId
`)

const createOrder = db.transaction(({userId, email, items}) => {
    const orderId = newId()
    const info = stmtCreateOrder.run(orderId, userId, email)

    for (let item of items) {
        stmtInsertOrderItem.run({
            orderId: orderId,
            productId: item.productId,
            amount: item.amount
        })
    }

    stmtSetOrderPrice.run({orderId})
    orderPushStatus(orderId, "created")

    return getOrder(orderId)
})







const stmtInsertOrderStatus = db.prepare(`
    INSERT INTO order_update
        (order_id, status, date)
    VALUES
        (?, ?, ?)
`)

function orderPushStatus(orderId, status) {
    stmtInsertOrderStatus.run(orderId, status, Date.now())
    broadcast("order", orderId, getOrder(orderId))
}



const stmtSetOrderPackage = db.prepare(`
    UPDATE shop_order
    SET package = $filename
    where id = $orderId
`)

function orderPutPackage(orderId, filename) {
    stmtSetOrderPackage.run({orderId, filename})
}





//
// Pubsub
//


// All this pubsub stuff was a lot more natural in a key-value model. There I
// could push updates every time I put something into the database, which
// could be done with only a thin wrapper around the dbPut() function.
//
// Here in the relational model, however, it's more complicated. I don't see a
// way do implement it other than calling the right broadcast event by hand
// every time from every place in the code that has something to do with it.
// Which is suboptimal as there can be multiple changes to the same object in
// a single transaction... so, this should preferably be done on a
// per-transaction basis... i dunno, TODO: i guess?
//
// What's nice about internal code is that you don't have to write too much of
// it too early. We only use this for order status updates, for now.

const subscribers = {
    order: {}
}

// callback gets an updated object as an argument
// it can return a truthy value to unsubscribe

function subscribe (bucket, id, callback) {
    if (!subscribers[bucket])
        console.error("pubsub: unsupported event: ", bucket)

    // this is a potential memory leak, isn't it?
    if (!subscribers[bucket][id]) subscribers[bucket][id] = []
    subscribers[bucket][id].push(callback)
}


function broadcast (bucket, id, obj) {
    const callbacks = subscribers[bucket][id]

    if (!callbacks)
        return

    for (let i = 0; i < callbacks.length; i++) {
        const unsubscribe = callbacks[i](obj)
        if (unsubscribe) {
            callbacks[i] = undefined
        }
    }

    // remove the unsubscribed
    subscribers[bucket][id] = callbacks.filter(sub => sub)
}




// TODO: extract into utils? OR use the db's native uuid()?
function newId () {
    return new Date().getTime().toString().substr() + '-' + Math.random().toString().substr(-4)
}




function transaction (f) {
    db.transaction(f)()
}



module.exports  = {
    getUser,
    userSetPassword,
    userCheckPassword,
    userHasPassword,
    createUser,

    getUserCart,
    saveCart,

    getProduct,
    searchProducts,
    getReviews,
    saveReview,

    findUserByEmail,

    getOrder,
    createOrder,
    orderPushStatus,
    orderPutPackage,

    subscribe,
    broadcast,

    transaction
}