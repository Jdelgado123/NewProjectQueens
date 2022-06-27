

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
    const {id} = req.body

    const [result] = await db.query('SELECT * FROM products WHERE id_product=?',[id])

    return res.status(200).json(result)
}


export default handler;