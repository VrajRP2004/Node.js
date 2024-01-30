const http = require("http")

const fs = require('fs')

const server = http.createServer();

server.listen(8000,'127.0.0.1',()=>{
})

console.log("Program has started")

// // stored in - 1st phase
// setTimeout(()=>{
//     console.log('Time callback executed')
// },0)

//stored in - 2nd phase
fs.readFile('./app_5/input.txt',()=>{
    console.log("File read complete")
    // stored in - 1st phase
    setTimeout(()=>{
        console.log('Time callback executed')
    },0)
    //stored in - 3rd phase
    setImmediate(()=>{
        console.log("SetImmediate is called")
    })

    process.nextTick(()=>{
        console.log("Process.nextTick callback executed")
    }) // here process.nextTick is special type of code so it's exedutes first after this phases's console.log , it's type of micro prsocess so it's execute first
    
})

// //stored in - 3rd phase
// setImmediate(()=>{
//     console.log("SetImmediate is called")
// })

console.log("Program has completed")