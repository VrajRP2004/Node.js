// import package
const express = require('express');
let app = express();

// ROUTE = HTTP METHOD + URL
app.get('/',(req,res)=>{
    res.status(200).send('Hello from express server')
    // res.send('Hello from express server')
})

// create a server

const port = 3000;
app.listen(port,()=>{
    console.log('server has started...')
})