const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getReport(req, res)

        case "POST":
            return await postReport(req,res)
    }

}

const getReport = async (req, res) => {
    const {dias} = req.query
    const [result] = await db.query("SELECT * FROM required WHERE date_request BETWEEN date_add(NOW(), INTERVAL -? DAY) AND NOW()",[dias]);
    return res.status(200).json(result)
}

const postReport = async (req,res) =>{
    const {name} = req.body
    const [result] = await db.query(`SELECT * FROM products WHERE name LIKE '${name}%'`)

    return res.status(200).json(result)
}

export default handler;