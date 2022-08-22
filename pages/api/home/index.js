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
    
    res.status(200).json({redirect:'/login'})
}

const postProducts = async (req,res) =>{
    const {name} = req.body
    const [result] = await db.query(`SELECT *,JSON_EXTRACT(name_img,'$[0]') as name_img FROM products WHERE name LIKE '${name}%'`)

    //console.log(req.cookies)

    return res.status(200).json(result)
}

export default handler;