// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {db} from '../../config/db'
import Cors from 'cors'

const express = require('express')
const router = express.Router()

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject('gaaa')
      }

      return resolve('aeas')
    })
  })
}

router.get('/',(req,res)=>{
  
  console.log(result)

  res.status(200).json({ name: 'John Doess' })
})

/*async function handler(req, res) {

  await runMiddleware(req,res,cors)
  const result = await db.query('SELECT NOW();')
  console.log(result)

  res.status(200).json({ name: 'John Doess' })
}*/

export default router;