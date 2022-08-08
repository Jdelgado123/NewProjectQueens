import db from "../../../config/db"
var jwt = require('jsonwebtoken')
import { setCookie } from 'cookies-next';


export default async function handler(req, res) {
    switch (req.method) {
        case "GET":

            return await getCreedentials(req, res)

        case "POST":

            return await postCreedentials(req, res)
    }
}

const getCreedentials = async (req, res) => {
    
    //return res.status(200).json(result)
}

const postCreedentials = async (req, res) => {
    const {username,password,remember} = req.body
    const [result] = await db.query("SELECT * FROM users WHERE username=? AND password=?",[username,password])

    if(result.length <= 0){
        res.status(200).json({
            alert:true,
            alertTitle:"Error",
            alertMessage:"Usuario y/o password incorrecto",
            alertIcon:'error',
            showConfirmButton:true,
            timer:false,
            ruta:'login'
        })
    }else{
        const id = result[0].id
        const role = result[0].state
        const token = jwt.sign({id,role},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRA
        })
        
        const cookieOptions = {
            expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
            httpOnly:true,
        }

        res.cookie('my_cookiesss', token ,cookieOptions);
        
        res.status(200).json({
            alert:true,
            alertTitle:"OK",
            alertMessage:"Login Correcto",
            alertIcon:'success',
            showConfirmButton:false,
            timer:800,
            permissio:role,
            ruta: role=='High'?'/admin':'/teller',
        })
    }
}