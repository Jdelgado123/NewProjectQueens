const db = require('../../config/db')

async function handler(req, res) {

  switch (req.method) {
    case "GET":
      return await getCreedentials(req, res)

    case "POST":
      return await postCreedentials(req,res)
  }

}

const getCreedentials = async (req, res) => {
  const [result] = await db.query("SELECT * FROM category");
  return res.status(200).json(result)
}

const postCreedentials = async(req,res) =>{
  
  return res.status(200).json(req.body)
}

export default handler;