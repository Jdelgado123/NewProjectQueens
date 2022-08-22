const db=require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getUpdate(req,res)
    
        case "POST":
            return await postUpdate(req,res)
    }
  
}

const getUpdate = async(req,res)=>{
    //const {id} = req.query
    console.log(req.query.cartItems)
  
}

const postUpdate = async(req,res)=>{
    const {id,name,stock,price,description,offer} = req.body

    const [result] = await db.query('UPDATE products SET name=?, stock=?,price=?,description=?,price_offer=? WHERE id_product=?',[name,stock,price,description,offer,id])

    return res.status(200).json(result)
}


export default handler;