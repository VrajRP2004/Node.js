const http = require('http')
const fs = require('fs')
const html = fs.readFileSync('./Template/index.html','utf-8')
// Step 1 : create a server

const server = http.createServer((req,res)=>{
    let path = req.url;
    if(path==='/' || path.toLocaleLowerCase() ==='/home'){
        res.end('You are in home page')
    }
    else if(path==='/' || path.toLocaleLowerCase() ==='/about'){
        res.end('You are in about page')
    }
    else if(path==='/' || path.toLocaleLowerCase() ==='/contact'){
        res.end('You are in contact page')
    }
    else{
        res.end("Error 404: page not found")
    }
})

// Step 2 : Start the server

server.listen(8000,'127.0.0.1',() => {
    console.log("Server has started!")
})