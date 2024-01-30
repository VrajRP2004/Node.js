const http = require('http')

// Step 1 : create a server

const server = http.createServer((req,res)=>{
    res.end('Hello form the server')
    console.log("a new request recived")
})

// Step 2 : Start the server

server.listen(8000,'127.0.0.1',() => {
    console.log("Server has started!")
})