const readline = require('readline');
const fs = require('fs');

// to read from file
let x = fs.readFileSync('./app_5/input.txt','utf-8')
console.log(x);

// to wirite in file
let content = `Data read fromm input.txt: ${x} \n Date created ${new Date()}`
fs.writeFileSync('./app_5/output.txt',content)
