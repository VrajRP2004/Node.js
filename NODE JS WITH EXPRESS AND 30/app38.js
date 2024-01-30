// import package
const express = require('express');
const fs = require('fs');
const morgan = require('morgan')

let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"))

const logger = function(req,res,next){
    console.log("Custom middleware called")
    next();
}

app.use(express.json())
app.use(morgan('dev'))
app.use(logger);
const getAllMovies = (req,res)=>{
        res.status(200).json({
            status:"sucess",
            count: movies.length,
            data:{
                movies:movies
            }
        })
    }

const getMovie = (req,res)=>{
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
}

const createMovie = (req,res)=>{
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
}

const updateMovie =  (req,res)=>{
    let id = req.params.id *1;
    let movieToUpdate = movies.find(el => el.id === id);
    if(!movieToUpdate){
        return res.status(404).json({
            status:"fail",
            message:"No movie object with ID "+id+ " is found"
        })
    }
    let  index = movies.indexOf(movieToUpdate);

    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
        res.status(200).json({
            status:"success",
            data:{
                movie: movieToUpdate
            }
        })
    })
}

const deleteMovie = (req,res)=>{
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

}

// //ep -34
// // GET - api/movie
// app.get('/api/v1/movies',getAllMovies)
// // ep - 35
// // POST - api/movie
// app.post('/api/v1/movies',createMovie);
// // ep -36
// // GET - api/v1/movies/id
// app.get('/api/v1/movies/:id',getMovie);
// // ep - 37
// // PATCH api/v1/movies/:id update
// app.patch("/api/v1/movies/:id",updateMovie);
// // ep - 38
// // Delete request
// app.delete("/api/v1/movies/:id",deleteMovie);

const moviesRouter = express.Router()

moviesRouter.route('/')
.get(getAllMovies)
.post(createMovie)

moviesRouter.route("/:id")
.get(getMovie)
.patch(updateMovie)
.delete(deleteMovie)

app.use('/api/v1/movies',moviesRouter)

// create a server

const port = 3000;
app.listen(port,()=>{
    console.log('server has started...')
})