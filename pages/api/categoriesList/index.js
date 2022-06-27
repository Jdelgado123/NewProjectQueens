const db=require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getCategories(req,res)
    
        case "POST":
            return console.log("aea post de mrd")
    }
  
}

const getCategories = async(req,res)=>{

    const {name} = req.query
    const [result] = await db.query("SELECT products.name,products.id_product,products.currency,products.price,products.name_img FROM products INNER JOIN category ON products.id_category = category.id_category WHERE category.name=?",[name]);
    return res.status(200).json(result)
}

export default handler;