const db=require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getCaja(req,res)
    
        case "POST":
            return await postCaja(req,res)
    }
  
}

const getCaja = async(req,res)=>{
    const [result] = await db.query("SELECT * FROM required")
    return res.status(200).json(result)
}

const postCaja = async(req,res)=>{
    console.log(req)
}


export default handler;