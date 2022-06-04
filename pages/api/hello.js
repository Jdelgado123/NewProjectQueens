// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db=require('../../config/db')

 async function handler(req, res) {

  switch (req.method) {
    case "GET":
      return res.status(200).json("fa");
    case "POST":
      return await postUser(req, res)
  }
}

const postUser = async(req, res)=> {
  console.log(req.body)
  res.status(200).json(req.body)
}

export default handler;