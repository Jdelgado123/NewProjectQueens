const db=require('../../../config/db')

async function handler2(req, res) {

    switch (req.method) {
        case "GET":
            return await getCategories(req,res)
    
        case "POST":
            return await postCategories(req,res)
    }
  
}

const getCategories = async(req,res)=>{
    const [result] = await db.query("SELECT * FROM category");
    return res.status(200).json(result)
}

const postCategories = async(req,res)=>{
    const {name,description_category} = req.body
    await db.query("INSERT INTO category (name, description_category) VALUES (?, ?)",[name,description_category]);
    const [result1] = await db.query("SELECT * FROM category");
    return res.status(200).json(result1)
}

export default handler2;