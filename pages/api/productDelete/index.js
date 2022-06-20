
const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getProducts(req, res)

        case "POST":
            return await postProduct(req, res)
    }

}


const postProduct=async(req,res) =>{
    const {id} = req.body
    const [result] = await db.query('DELETE FROM products WHERE id_product=?;',[id]);
    return res.status(200).json(result)

}  

export default handler;