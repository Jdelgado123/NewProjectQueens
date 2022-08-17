const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getTeller(req, res)

        case "POST":
            return await postTeller(req, res)
    }

}

const getTeller = async (req, res) => {
    const {dni} = req.query

    const [result] = await db.query("SELECT * FROM loans WHERE dni=?",[dni])
    
    return res.status(200).json(result)
}

async function postTeller(req, res) {

    const array = req.body.cartItems

    const totalPrice = req.body.totalPrice

    const [result] = await db.query("INSERT INTO required SET ?", { total_cost: totalPrice })

    array.map(async (item) => {
        const keys = Object.keys(item)
        const myVals = keys.find(element => {
            return element == "sizename"
        })
        if (myVals == undefined) {
            
            const rest = item.stock - item.quantity
            const [update] = await db.query("UPDATE products SET stock=? WHERE id_product=?", [rest, item.id_product])
            const [todoChevere] = await db.query("INSERT INTO products_required SET ?", { id_required: result.insertId, id_product: item.id_product, stock: item.quantity })
        } else {
            
            const rest = item.stock - item.quantity
            const [selectSize] = await db.query("SELECT stock FROM size_product WHERE id_product=? AND sizename=?",[item.id_product,item.sizename])

            const restsize = selectSize[0].stock - item.quantity
            const [updateSize] = await db.query("UPDATE size_product SET stock=? WHERE id_product=? AND sizename=?",[restsize,item.id_product,item.sizename])
            const [updateProduct] = await db.query("UPDATE products SET stock=? WHERE id_product=?", [rest, item.id_product])
            const [todoChevere] = await db.query("INSERT INTO products_required SET ?", { id_required: result.insertId, id_product: item.id_product, stock: item.quantity })
        }

    });
}


export default handler;