const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const db =require('../../config/db')

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
    var ada = req.body
    res.status(200).json(ada)
})


router.post('/images/post',fileUpload,async(req,res)=>{
    const {name,description,price,stock,barcode,category,subcategory,location,currency} = req.body

    const jsonname = []
    const ttt = req.files
    ttt.map(file => {jsonname.push(file.filename)})
    
    console.log(jsonname)
    console.log(req.body)
    console.log(req.files)
    const result = await db.query('INSERT INTO products set ?',{id_category:category,id_subcategory:subcategory,name,description,price,stock,barcode,name_img:'{"aea.jpg":"asda"}',location,currency})
    console.log(result)
    res.status(200).json(req.body)
})



module.exports = router