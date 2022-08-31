import db from "../../../config/db"
import nextConnect from 'next-connect'
const path = require('path')
import multer from "multer";
const tinyfy = require('tinify')
const cloudinary = require('cloudinary');
const fs = require('fs-extra')

cloudinary.config({
  cloud_name:'da1ngu69j',
  api_key:'399336699412577',
  api_secret:'0BcUfrtnnBYidQuBRLWKw5YGMxs'
})

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

    const {title,description} = req.body

    const resultcloudinary = await cloudinary.v2.uploader.upload(req.files[0].path)

    await fs.unlink(req.files[0].path)

    const [result] = await db.query('INSERT INTO publications SET ?',{title,description,image:resultcloudinary.url})
    res.status(200).json({ data: 'success' });
  });
  
  export default apiRoute;

  export const config={
    api:{
        bodyParser : false
    }
  }