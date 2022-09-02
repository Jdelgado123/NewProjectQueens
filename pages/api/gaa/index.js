import db from "../../../config/db"
import nextConnect from 'next-connect'
const path = require('path')
import multer from "multer";
const cloudinary = require('cloudinary');
const fs = require('fs-extra')

cloudinary.config({
  cloud_name: 'da1ngu69j',
  api_key: '399336699412577',
  api_secret: '0BcUfrtnnBYidQuBRLWKw5YGMxs'
})

const direccionFolder = '../../../../public/imagesServer2/'

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, direccionFolder),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const fileUpload = multer({
  storage: diskStorage
}).any('imagen', 10)



const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});


apiRoute.use(fileUpload)

// Process a POST request
apiRoute.post(async (req, res) => {

  const { name, description, price, stock, barcode, category, location, currency, sizes } = req.body

  const jsonname = []
  const ttt = req.files
  let barcodedata

  barcode == "" ? barcodedata = 0 : barcodedata = barcode
  const sizesArray = JSON.parse(sizes)

  const aea = (sss) => {
    const json = []
    sss.map(async (file) => {
      const datacloudinary = await cloudinary.v2.uploader.upload(file.path)
      json.push(datacloudinary.secure_url)
      await fs.unlink(file.path)
      console.log(json)
    })
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve(true)   
      },2000)
    }) 
  }

  aea(ttt).then(async(results) => {
    console.log(results)
    
  })

  /*if (sizesArray === null) {
    const [result] = await db.query('INSERT INTO products set ?', { id_category: category, name, description, price, stock, barcode: barcodedata, name_img: JSON.stringify(json), location, currency })
    res.status(200).json(req.body)
  } else {
    const [result] = await db.query('INSERT INTO products set ?', { id_category: category, name, description, price, stock, barcode: barcodedata, name_img: JSON.stringify(jsonname), location, currency })
    sizesArray.map(async (item) => {
      const insertSize = await db.query('INSERT INTO size_product SET ?', { id_product: result.insertId, sizename: item.size_name, stock: item.size_stock })
    })

  }*/


});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false
  }
}