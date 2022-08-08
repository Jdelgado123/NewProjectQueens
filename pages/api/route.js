const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()

const db =require('../../config/db')

app.use(cookieParser())

const diskStorage = multer.diskStorage({
    destination:path.join(__dirname, '../../public/imagesServer2'),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const fileUpload = multer({
    storage:diskStorage
}).any('imagen',10)



router.get('/asas',async(req,res)=>{
    console.log("adada")

    console.log(req.cookies)
    var ada = req.body
    res.status(200).json(ada)
})


router.post('/images/post',fileUpload,async(req,res)=>{
    const {name,description,price,stock,barcode,category,location,currency,sizes} = req.body

    const jsonname = []
    const ttt = req.files
    let barcodedata

    barcode==""? barcodedata = 0 : barcodedata = barcode

    console.log(barcodedata)

    ttt.map(file => {jsonname.push(file.filename)})

    const sizesArray = JSON.parse(sizes)

    if(sizesArray === null){
        const result = await db.query('INSERT INTO products set ?',{id_category:category,name,description,price,stock,barcode:barcodedata,name_img:JSON.stringify(jsonname),location,currency})
        console.log(result)
        res.status(200).json(req.body)
    }else{
        const [result] = await db.query('INSERT INTO products set ?',{id_category:category,name,description,price,stock,barcode,name_img:JSON.stringify(jsonname),location,currency})
        sizesArray.map(async(item)=>{
            const insertSize = await db.query('INSERT INTO size_product SET ?',{id_product:result.insertId,sizename:item.size_name,stock:item.size_stock})
            console.log(insertSize)
        })

    }
    
})

router.post('/ga/post',async(req,res)=>{
    const {sizes} = req.body

    res.cookie('my_cookie', 'geeksforgeeks');
    res.send('Cookies added')
    console.log(req.cookies)
})


module.exports = router