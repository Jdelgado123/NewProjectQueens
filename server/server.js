const express = require('express')
const next = require('next')
const port = 3000;
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express();

    server.use(myconn(mysql,{
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'queensdb'
    }));
    server.use(require('../pages/api/route'))
    server.use(cors())
    server.get('*',(req,res)=>{
        return handle(req,res)
    });

    server.listen(port,err=>{
        if(err) throw err;
        console.log(`Servidor listo en el puerto ${port}` )
    })
}).catch(ex=>{
    console.log(ex.stack);
    process.exit(1);
});
