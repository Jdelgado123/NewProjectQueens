import db from "../../../config/db"
import nextConnect from 'next-connect'
const path = require('path')
import multer from "multer";
const tinyfy = require('tinify')

const direccionFolder = '../../../../public/imagesServer2/'

const compressing = (x) => {
  tinyfy.key = '5CkKrPYVVTxCb8nx7ybkvlsXPrxW8Qnk'
  tinyfy.fromFile(path.join(__dirname, direccionFolder+x)).toFile(path.join(__dirname, direccionFolder+x));
}

const diskStorage = multer.diskStorage({
    destination:path.join(__dirname, direccionFolder),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const fileUpload = multer({
    storage:diskStorage
}).any('imagen',10)



const apiRoute = nextConnect({
    // Handle any other HTTP method
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
  

  apiRoute.use(fileUpload)

  // Process a POST request
  apiRoute.post(async(req, res) => {

    const {name,description,price,stock,barcode,category,location,currency,sizes} = req.body

    const jsonname = []
    const ttt = req.files
    let barcodedata

    barcode==""? barcodedata = 0 : barcodedata = barcode

    ttt.map(file => {
        jsonname.push(file.filename)
        compressing(file.filename)
    })

    const sizesArray = JSON.parse(sizes)

    if(sizesArray === null){
        const [result] = await db.query('INSERT INTO products set ?',{id_category:category,name,description,price,stock,barcode:barcodedata,name_img:JSON.stringify(jsonname),location,currency})
        res.status(200).json(req.body)
    }else{
        const [result] = await db.query('INSERT INTO products set ?',{id_category:category,name,description,price,stock,barcode:barcodedata,name_img:JSON.stringify(jsonname),location,currency})
        sizesArray.map(async(item)=>{
            const insertSize = await db.query('INSERT INTO size_product SET ?',{id_product:result.insertId,sizename:item.size_name,stock:item.size_stock})
        })

    }
  });
  
  export default apiRoute;

  export const config={
    api:{
        bodyParser : false
    }
  }