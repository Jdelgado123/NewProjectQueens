const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getProducts(req, res)

        case "POST":
            return console.log("aea post de mrd")
    }

}

const getProducts = async (req, res) => {
    const [result] = await db.query("SELECT id_product,name,description,price,stock,barcode,name_img,currency FROM products");
    return res.status(200).json(result)
}

export default handler;