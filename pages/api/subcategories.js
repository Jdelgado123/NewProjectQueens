const db=require('../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getSubCategories(req,res)
    
        case "POST":
            return console.log("aea post de mrd")
    }
  
}

const getSubCategories = async(req,res)=>{
    const [result] = await db.query("SELECT * FROM subcategory");
    return res.status(200).json(result)
}

export default handler;