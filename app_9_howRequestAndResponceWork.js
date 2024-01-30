const http = require('http')
const fs = require('fs')
const html = fs.readFileSync('./Template/index.html','utf-8')
// Step 1 : create a server

const server = http.createServer((req,res)=>{
    res.end(html)
    console.log("a new request recived")
})

// Step 2 : Start the server

server.listen(8000,'127.0.0.1',() => {
    console.log("Server has started!")
})