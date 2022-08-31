import db from "../../../config/db"
import nextConnect from 'next-connect'
const path = require('path')
import multer from "multer";
const cloudinary = require('cloudinary');
const fs = require('fs-extra')

cloudinary.config({
  cloud_name:'da1ngu69j',
  api_key:'399336699412577',
  api_secret:'0BcUfrtnnBYidQuBRLWKw5YGMxs'
})

let json = []
const direccionFolder = '../../../../public/imagesServer2/'

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
    const sizesArray = JSON.parse(sizes)

    aea()

    function aea () {
      ttt.map(async(file)=>{
        await cloudinary.v2.uploader.upload(file.path).then(res=>json.push(res.secure_url)).catch(err=>console.log(err)) 
        await fs.unlink(file.path) 
        console.log(json)      
      })
    }
    
    console.log(json)
    
    
  });
  
  export default apiRoute;

  export const config={
    api:{
        bodyParser : false
    }
  }