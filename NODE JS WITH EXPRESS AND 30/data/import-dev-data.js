const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Movie = require('./../Models/movieModel');
dotenv.config({path:'./../config48.env'})

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser: true
}).then((conn)=>{
    // console.log(conn);
    console.log("db connection successfull")
}).catch((err)=>{
    console.log(err+'some error has occured')
})
console.log("vraj")

// Read MOVIES.JSON FILE

let movies = JSON.parse(fs.readFileSync("./movies.json"))


// Delete existing Movie Documents from Collection
const deleteMovie = async () =>{
    try{
        await Movie.deleteMany();
        console.log("data successfully deleted")
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}

// Import movies data to mongodb colletions

const importMovie = async () =>{
    try{
        await Movie.create(movies);
        console.log("data successfully imported")
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}
// deleteMovie();
// importMovie();

if(process.argv[2]=='--import')
{
    importMovie();
}
if(process.argv[2]=='--delete')
{
    deleteMovie();
}
