const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getzonevip(req, res)

        case "POST":
            return await postzonevip(req,res)
    }

}

const getzonevip = async (req, res) => {
    const [result] = await db.query("SELECT * FROM publications")

    return res.status(200).json(result)
}

const postzonevip = async (req,res) =>{
    

    return res.status(200).json({aea:'tas en offertas post'})
}

export default handler;