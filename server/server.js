const express = require('express')
const next = require('next')
const port = 3000;
const cors = require('cors')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express();
    server.use(express.json())
    server.use(require('../pages/api/route'))
    server.use(cors())
    server.use(express.static(path.join(__dirname,'../imagesServer2')))
    server.all('*',(req,res)=>{
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
