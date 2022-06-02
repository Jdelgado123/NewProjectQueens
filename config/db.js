const createPool = require('mysql2/promise')

const db = createPool.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'queensdb'
})

module.exports=db