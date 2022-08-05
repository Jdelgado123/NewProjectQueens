import Protect from '../../../middleware/Protect';

const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getProducts(req, res)

        case "POST":
            return await postProducts(req,res)
    }

}

const getProducts = async (req, res) => {
    const [result] = await db.query("SELECT id_product,name,description,price,stock,barcode,JSON_EXTRACT(name_img,'$[0]') as name_img,currency FROM products");
    return res.status(200).json(result)
}

const postProducts = async (req,res) =>{
    const {name} = req.body
    const [result] = await db.query(`SELECT *,JSON_EXTRACT(name_img,'$[0]') as name_img FROM products WHERE name LIKE '${name}%'`)

    return res.status(200).json(result)
}

export default Protect(handler);