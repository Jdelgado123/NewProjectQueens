import {createPool} from 'mysql2/promise'

const db = createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'queensdb'
})

export{db};