const db=require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getRequires(req,res)
    
        case "POST":
            return await postRequires(req,res)
    }
  
}

const getRequires = async(req,res)=>{
    const [result] = await db.query("SELECT * FROM required")


    
    return res.status(200).json(result)
}

const postRequires = async(req,res)=>{
    const {id} = req.body

    const [result] = await db.query("SELECT required.id_required,products_required.stock, required.total_cost,required.state,products.name,products.name_img,products.price,products.location FROM (required INNER JOIN products_required ON required.id_required=products_required.id_required) INNER JOIN products ON products_required.id_product=products.id_product WHERE required.id_required=?",[id])


    return res.status(200).json(result)
}


export default handler;