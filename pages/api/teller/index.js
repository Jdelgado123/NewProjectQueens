const db=require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getTeller(req,res)
    
        case "POST":
            return await postTeller(req,res)
    }
  
}

const getTeller = async(req,res)=>{
    //const {id} = req.query
    console.log(req.query.cartItems)
    //const [result] = await db.query("SELECT * FROM subcategory WHERE id_category=?",[id]);
    //return res.status(200).json(result)
}

const postTeller = async(req,res)=>{
    const array = req.body
    const [result] = await db.query("INSERT INTO required SET ?",{total_cost:250})
    console.log(result)
    
    array.map(async(item)=>{
        const [todoChevere] = await db.query("INSERT INTO products_required SET ?",{id_required:result.insertId,id_product:item.id_product})
        console.log(todoChevere)
    });
}


export default handler;