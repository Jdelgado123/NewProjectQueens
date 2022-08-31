const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const tinyfy = require('tinify')
const db = require('../../config/db')
const cloudinary = require('cloudinary');
const fs = require('fs-extra')

cloudinary.config({
    cloud_name: 'da1ngu69j',
    api_key: '399336699412577',
    api_secret: '0BcUfrtnnBYidQuBRLWKw5YGMxs'
})


const compressing = (x) => {
    tinyfy.key = '5CkKrPYVVTxCb8nx7ybkvlsXPrxW8Qnk'
    tinyfy.fromFile(path.join(__dirname, `../../public/imagesServer2/${x}`)).toFile(path.join(__dirname, `../../public/imagesServer2/${x}`));

}


app.use(cookieParser())

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/imagesServer2'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskStorage
}).any('imagen', 10)


router.post('/images/post', fileUpload, async (req, res) => {
    const { name, description, price, stock, barcode, category, location, currency, sizes } = req.body

    const jsonname = []
    const ttt = req.files
    let barcodedata

    barcode == "" ? barcodedata = 0 : barcodedata = barcode

    ttt.map(file => {
        jsonname.push(file.filename)
        compressing(file.filename)
    })

    const sizesArray = JSON.parse(sizes)

    if (sizesArray === null) {
        const [result] = await db.query('INSERT INTO products set ?', { id_category: category, name, description, price, stock, barcode: barcodedata, name_img: JSON.stringify(jsonname), location, currency })
        res.status(200).json(req.body)
    } else {
        const [result] = await db.query('INSERT INTO products set ?', { id_category: category, name, description, price, stock, barcode: barcodedata, name_img: JSON.stringify(jsonname), location, currency })
        sizesArray.map(async (item) => {
            const insertSize = await db.query('INSERT INTO size_product SET ?', { id_product: result.insertId, sizename: item.size_name, stock: item.size_stock })
        })

    }

})

router.get('/aea/mrd', async (req, res) => {

    const [result] = await db.query("SELECT * FROM products")


    fs.readdir((path.join(__dirname, '../../public/imagesServer2/')), (err, archivos) => {
        if (err) {
            console.log(err)
        }
        result.map(r=>{
            const ff = JSON.parse(r.name_img)
            console.log(r.id_product)
            console.log(ff)
            ff.map(f=>{
                const position = ff.indexOf(f)
                archivos.map(async(archivo)=>{
                    if(f===archivo){
                        const ga = (path.join(__dirname, '../../public/imagesServer2/' + archivo))
                        
                        const resultcloud = await cloudinary.v2.uploader.upload(ga)

                        ff[position] = resultcloud.secure_url

                        
                        await db.query('UPDATE products SET name_img= ? WHERE id_product = ?',[JSON.stringify(ff),r.id_product])

                    }
                })
            })
            
            archivos.map(archivo => {
                const ga = (path.join(__dirname, '../../public/imagesServer2/' + archivo))
                
            })
        })  
    })

    return res.status(200).json(result)
})



module.exports = router