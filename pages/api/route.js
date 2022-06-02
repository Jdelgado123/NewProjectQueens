const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const db =require('../../config/db')

const diskStorage = multer.diskStorage({
    destination:path.join(__dirname, '../../imagesServer2'),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const fileUpload = multer({
    storage:diskStorage
}).single('imagen')



router.get('/asas',(req,res)=>{
    pool.query( )
    res.status(200).json({ name: 'John Doe' })
})


router.post('/images/post',fileUpload,async(req,res)=>{
    const {name,description,price,stock,barcode,category} = req.body
    
    const img = fs.readFileSync(path.join(__dirname,'../../imagesServer2/'+req.file.filename))
    const name_img = req.file.originalname

    const result = await db.query('INSERT INTO products set ?',{id_category:category,name,description,price,stock,barcode,name_img,img})

    console.log(result)

    /*req.getConnection((err,conn)=>{
        if(err) {return console.log("error en la base de datos: "+err)}

        const img = fs.readFileSync(path.join(__dirname,'../../imagesServer2/'+req.file.filename))
        const name_img = req.file.originalname
        
        conn.query('INSERT INTO products set ?',[{name,description,price,stock,barcode,name_img,img}],(err,result)=>{
            if(err) {return console.log("error en la base de datos: "+err)}

            console.log(result)
        })
    })*/
})


module.exports = router