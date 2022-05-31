const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

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
    const {products} = req.body
    res.status(200).json({name:'Todo esta bien'})
    console.log(products)
    console.log(req.file)
})

module.exports = router