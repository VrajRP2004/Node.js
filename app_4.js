const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

r1.question("please enter name: ",(name)=>{
    console.log("You entered: " +name);
    r1.close();
})

// to perform some process after the close function
r1.on('close',()=>{
    console.log("Interface closed")
    process.exit();
})