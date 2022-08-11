const db = require('../../../config/db')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getRequires(req, res)

        case "POST":
            return await postRequires(req, res)

        case "PUT":
            return await putRequires(req, res)
    }

}

const getRequires = async (req, res) => {
    const [result] = await db.query("SELECT * FROM required WHERE state='pendiente'")

    return res.status(200).json(result)
}

const postRequires = async (req, res) => {
    const { id } = req.body

    const [result] = await db.query("SELECT required.id_required,products_required.stock, required.total_cost,required.state,products.name,JSON_EXTRACT(name_img,'$[0]') as name_img,products.price,products.location FROM (required INNER JOIN products_required ON required.id_required=products_required.id_required) INNER JOIN products ON products_required.id_product=products.id_product WHERE required.id_required=?", [id])


    return res.status(200).json(result)
}

const putRequires = async (req, res) => {
    const {id,state,method} = req.body

    if(state === "cancelado"){
        const [select] = await db.query("SELECT stock,id_product FROM products_required WHERE id_required=?",[id])
        console.log(select)

        select.map(async(item)=>{
            const [regreat] = await db.query("SELECT stock FROM products WHERE id_product=?",[item.id_product])
            regreat.map(async(regreatitem)=>{
                const number = regreatitem.stock + item.stock
                const [update] = await db.query("UPDATE products SET stock=? WHERE id_product=?",[number,item.id_product])
                console.log(update)
            }) 
        })
        const [result] = await db.query("UPDATE required SET state= ? WHERE id_required = ?",[state,id])
        return res.status(200).json(result)
    }else{
        const [result] = await db.query("UPDATE required SET state= ?, method= ? WHERE id_required = ?",[state,method,id])
        return res.status(200).json(result)
    }

    
}

export default handler;