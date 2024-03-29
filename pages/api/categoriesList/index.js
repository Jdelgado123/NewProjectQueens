const db=require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getCategories(req,res)
    
        case "POST":
            return console.log("post de mrd")
    }
  
}

const getCategories = async(req,res)=>{

    const {name} = req.query
    const [result] = await db.query("SELECT *,products.name ,JSON_EXTRACT(name_img,'$[0]') as name_img FROM products INNER JOIN category ON products.id_category = category.id_category WHERE category.name=?",[name]);
    return res.status(200).json(result)
}

export default handler;