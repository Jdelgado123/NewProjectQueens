// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db=require('../../config/db')

async function handler(req, res) {

  const result = await db.query('SELECT NOW();')
  console.log(result)

  res.status(200).json(result)
}

export default handler;