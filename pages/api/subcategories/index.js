const db=require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getSubCategories(req,res)
    
        case "POST":
            return await postSubCategories(req,res)
    }
  
}

const getSubCategories = async(req,res)=>{
    const {id} = req.query
    const [result] = await db.query("SELECT * FROM subcategory WHERE id_category=?",[id]);
    return res.status(200).json(result)
}

const postSubCategories = async(req,res)=>{
    const {name,description, category} = req.body
    const [result] = await db.query("INSERT INTO subcategory (name, description_subcategory, id_category) VALUES (?, ?,?)",[name,description,category]);
    console.log(result);
    return res.status(200).json(result)
}


export default handler;