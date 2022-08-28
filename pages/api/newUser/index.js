const db = require('../../../config/db')
const bcrypt = require('bcryptjs')

async function handler(req, res) {

    switch (req.method) {
        case "GET":
            return await getNewUser(req, res)

        case "POST":
            return await postNewUser(req, res)
    }

}

const getNewUser = async (req, res) => {
    const { name } = req.query

    if (name == undefined) {
        const [result] = await db.query("SELECT * FROM category");
        return res.status(200).json(result)
    } else {
        const [result] = await db.query("SELECT * FROM category WHERE description_category=?", [name]);
        return res.status(200).json(result)
    }

}

const postNewUser = async (req, res) => {

    try {
        const { name, password } = req.body
        
        //let passHash = await bcrypt.hash(password, 8)
        
        await db.query("INSERT INTO users SET ?", { username: name, password: password,state:'vip' });
    } catch (error) {
        console.log(error);
    }
    

}

export default handler;