import { db } from "../../../config/db"

export default async function handlerPostProduct(req,res) {
    
    switch (req.method) {
        case 'GET':
            return await getProducts(req,res)
    
        case 'POST':
            return await saveProduct(req,res)
    }
}

const getProducts = async(req,res)=>{
    const [result]=await db.query("SELECT * FROM products")

    return res.status(200).json(result)
}

const saveProduct = async(req,res)=>{
    const {name,description,price,stock,img} = req.body

    const [result] = await db.query("INSERT INTO products set ?",{
        name,
        description,
        price,
        stock,
        img
    })
    console.log(result)
    return res.status(200).json('creating Product')
}
