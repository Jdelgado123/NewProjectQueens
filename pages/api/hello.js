// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {db} from '../../config/db'

const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
  
  console.log(result)

  res.status(200).json({ name: 'John Doess' })
})

async function handler(req, res) {

  const result = await db.query('SELECT NOW();')
  console.log(result)

  res.status(200).json({ name: 'John Doess' })
}

export default router;