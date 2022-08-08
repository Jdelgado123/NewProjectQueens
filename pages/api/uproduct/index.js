

const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getProducts(req, res)

        case "POST":
            return await postProducts(req, res)
        case "DELETE":
            return await deleteProduct(req,res)
    }

}

const getProducts = async(req,res) => {
    const {id} = req.body
    console.log(req.body)
    const [result] = await db.query("SELECT * FROM products WHERE id_product=?",[id]);
    console.log(result)
    return res.status(200).json(id)
}

const postProducts=async(req, res) =>{
    const {idbody} = req.body
    const [result] = await db.query("SELECT id_product,name,description,price,stock,location,currency,name_img, JSON_EXTRACT(name_img,'$') as name_imgs FROM products WHERE id_product=?",[idbody]);
    return res.status(200).json(result)
}

const deleteProduct=async(req,res) =>{
    const {id} = req.body
    const [result] = await db.query('DELETE FROM products WHERE id_product=?',[id]);
    return res.status(200).json(result)

}

export default handler;