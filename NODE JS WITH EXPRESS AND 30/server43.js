// // ep-64
// const mongoose = require('mongoose')

// ep -67
const mongoose = require('mongoose')

// ep -48
const dotenv = require('dotenv')
dotenv.config({path:'./config48.env'})

// create a server

const app = require("./app43")

// ep 100
process.on('uncaughtException',(err)=>{
    console.log(err.name,err.message)
    console.log('uncaught Exception occured! shutting down...')
    server.close(()=>{
        process.exit(1);
    })
})


// ep-64
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser: true
}).then((conn)=>{
    // console.log(conn);
    console.log("db connection successfull")
})
// .catch((err)=>{
//     console.log("ues")
//     console.log(err+'some error has occured')
// })


// // ep-65 create schema
// const movieSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         require:[true, 'Name is required field!'],
//         unique: true
//     },
//     description: String,
//     duration: {
//         type:Number,
//         require:[true, 'Name is required field!']
//     },
//     ratings: {
//         type:Number,
//         default:1.0
//     }
// })

// // ep -65 crete model
// const Movie = mongoose.model('Movie',movieSchema);

// ep - 66 

// const testMovie = new Movie({
//     name:"Dievdfsdraj1 hard",
//     description:"Action packed movie staring bruce willins i this trilling adventure.",
//     duration: 139,
//     ratings: 4.5
// })

// testMovie.save().then(doc=>{
//     console.log(doc)
// })
// .catch(err =>{
//     console.log("Error occured: " + err);
// })

// ep -47
console.log(app.get('env')) // here env in built in enviroment
console.log(process.env) //process.env is available every we have not require it like require('express')

const port = process.env.PORT || 3000;


// app.listen(port, () =>{
//     console.log('server has started...')
// })

//ep 99
const server = app.listen(port, () =>{
    console.log('server has started...')
})

// ep 99
process.on('unhandledRejection',(err)=>{
    console.log(err.name,err.message)
    console.log('unhandled rejection occured! shutting down...')
    server.close(()=>{
        process.exit(1);
    })
})
