import db from "../../../config/db"


export default async function handler(req, res) {
    switch (req.method) {
        case "GET":

            return await getCreedentials(req, res)

        case "POST":

            return await postCreedentials(req, res)
    }
}

const getCreedentials = async (req, res) => {
    console.log("estamos en get")
    console.log(req)
    //return res.status(200).json(result)
}

const postCreedentials = async (req, res) => {
    const {username,password,remember} = req.body
    const [result] = await db.query("SELECT * FROM users WHERE username=? AND password=?",[username,password])

    return res.status(200).json(result)
}