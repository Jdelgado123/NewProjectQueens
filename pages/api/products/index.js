import { db } from "../../../config/db"
import multer from "multer"
import path from 'path'

const diskStorage = multer.diskStorage({
    destination:path.join(__dirname,'../../../../imagesServers'),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const fileUpload = multer({
    storage:diskStorage
})

export default async function handlerPostProduct(req,res) {
    
    switch (req.method) {
        case 'GET':
            return await getProducts(req,res)
    
        case 'POST':
            return saveProduct(req,res)
    }
}

const getProducts = async(req,res)=> {
    const [result]=await db.query("SELECT * FROM products")

    return res.status(200).json(result)
}

const saveProduct = fileUpload.single('imagen') = async(req,res)=>{
    const {name,description,price,stock} = req.body
    console.log(req.file)
    const [result] = await db.query("INSERT INTO products set ?",{
        name,
        description,
        price,
        stock,
        img
    })
    return res.status(200).json('creating Product')
};
