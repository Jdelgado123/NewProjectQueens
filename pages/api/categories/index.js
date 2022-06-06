const db=require('../../../config/db')

async function handler2(req, res) {

    switch (req.method) {
        case "GET":
            return await getCategories(req,res)
    
        case "POST":
            return console.log("aea post de mrd")
    }
  
}

const getCategories = async(req,res)=>{
    const [result] = await db.query("SELECT * FROM category");
    return res.status(200).json(result)
}

export default handler2;