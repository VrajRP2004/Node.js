// import package
const express = require('express');
const fs = require('fs');

let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"))

app.use(express.json())

//ep -34
// GET - api/movie

app.get('/api/v1/movies',(req,res)=>{
    res.status(200).json({
        status:"sucess",
        count: movies.length,
        data:{
            movies:movies
        }
    })
})
// ep - 35
// POST - api/movie
app.post('/api/v1/movies',(req,res)=>{
    // console.log(req.body);
    const newId = movies[movies.length-1].id + 1;

    const newMovie = Object.assign({id:newId},req.body)

    movies.push(newMovie);
    fs.writeFile('./data/movies.json',JSON.stringify(movies),()=>{
        res.status(201).json({
            status: "sucess",
            data : {
                movie: newMovie
            }
        })
    })
    // res.send('Created')
})

// ep -36
// GET - api/v1/movies/id
app.get('/api/v1/movies/:id',(req,res)=>{
    console.log(req.params);
    const id = req.params.id*1; // if you write only req.params.id it's contain string value so by multiply by * 1 it's contain numeric value
    let movie = movies.find(el => el.id===id)
    if(!movie){
        return res.status(404).json({
            status:"fail",
            message: "Movie with ID "+id+ " is not available"
        })
    }
    res.status(200).json({
        status:"sucess",
        data: {
            movie: movie
        }
    })
})

// ep - 37

app.patch("/api/v1/movies/:id", (req,res)=>{
    let id = req.params.id *1;
    let movieToUpdate = movies.find(el => el.id === id);
    if(!movieToUpdate){
        return res.status(404).json({
            status:"fail",
            message:"No movie object with ID "+id+ " is found"
        })
    }
    let  index = movies.indexOf(movieToUpdate);

    // Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
        res.status(200).json({
            status:"success",
            data:{
                movie: movieToUpdate
            }
        })
    })
})

// ep - 38
// Delete request

app.delete("/api/v1/movies/:id",(req,res)=>{
    let id = req.params.id *1;
    let movieToDelete = movies.find(el => el.id === id);
    if(!movieToDelete){
        return res.status(404).json({
            status:"fail",
            message:"No movie object with ID "+id+ " is found"
        })
    }
    const index = movies.indexOf(movieToDelete);

    movies.splice(index,1);
    fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
        res.status(200).json({
            status:"success",
            data:{
                movie: null
            }
        })
    })

})


// create a server

const port = 3000;
app.listen(port,()=>{
    console.log('server has started...')
})