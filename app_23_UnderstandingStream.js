const http = require("http")

const fs = require('fs')

const server = http.createServer();

server.listen(8000,'127.0.0.1',()=>{
    console.log("created")
})

//SOLUTION 1 : without readble or writabel stram to read big or large file 
// this solution is not effective

// server.on('req',(req,res)=>{
//     fs.readFile('.app_5/large-file.txt',(err,data)=>{
//         if(err){
//             res.end("something went wrong!")
//             return;
//         }
//         res.end(data);
//     })
// })

//SOLUTION 2 : with readble or writabel stram to read big or large file 


// server.on('request',(req,res)=>{
//     let rs = fs.createReadStream('./app_5/large-file.txt')
//     // console.log(rs);
//     rs.on('data',(chunk)=>{
//         res.write(chunk)
//     })
//     rs.on('end',()=>{
//         res.end();
//     })
//     rs.on('error',(error)=>{
//         res.end(error.message);
//     })
// })

//SOLUTION 3 : using pipe method

server.on('request',(req,res)=>{
    let rs = fs.createReadStream('./app_5/large-file.txt')
    rs.pipe(res);

})