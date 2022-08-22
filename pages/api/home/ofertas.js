const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getOffer(req, res)

        case "POST":
            return await postProducts(req,res)
    }

}

const getOffer = async (req, res) => {
    const [result] = await db.query("SELECT *, JSON_EXTRACT(name_img,'$[0]') as name_img FROM products WHERE price_offer>0")

    return res.status(200).json(result)
}

const postOffer = async (req,res) =>{
    

    return res.status(200).json({aea:'tas en offertas post'})
}

export default handler;