const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const diskStorage = multer.diskStorage({
    destination:path.join(__dirname, '../../imagesServer2'),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const fileUpload = multer({
    storage:diskStorage
}).single('imagen')



router.get('/',(req,res)=>{
    console.log('aeas')
    res.status(200).json({ name: 'John Doe' })
})



router.post('/images/post',fileUpload,(req,res)=>{
    const {name,description,price,stock,barcode} = req.body
    
    req.getConnection((err,conn)=>{
        if(err) {return console.log("error en la base de datos: "+err)}

        const img = fs.readFileSync(path.join(__dirname,'../../imagesServer2/'+req.file.filename))
        const name_img = req.file.originalname
        
        conn.query('INSERT INTO products set ?',[{name,description,price,stock,barcode,name_img,img}],(err,result)=>{
            if(err) {return console.log("error en la base de datos: "+err)}

            console.log(result)
        })
    })
})

module.exports = router