const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getProducts(req, res)

        case "POST":
            return await postProducts(req, res)
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
    const [result] = await db.query("SELECT * FROM products WHERE id_product=?",[idbody]);
    return res.status(200).json(result)
}

export default handler;