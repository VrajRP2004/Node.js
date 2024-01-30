const readline = require('readline')
const fs = require('fs');
fs.readFile('./app_5/start.txt', 'utf-8',(error1,data1)=>{
    console.log(data1)
    fs.readFile(`./app_5/${data1}.txt`,'utf-8',(error2,data2)=>{
        console.log(data2)
    })
})
console.log("Reading file....")