// const fs = require('fs');

// ep-45
// exports.validatedBody = (req,res,next)=>{
//     // if(!req.body.name || !req.body.reLeaseYear || !req.body.duration){
//     if(!req.body.name || !req.body.discription || !req.body.duration){
//         return res.status(400).json({
//             status:"fail",
//             message:"Not a valid movie data"
//         })
//     }
//     next();
// }

// ep 81
const ApiFeatures = require('./../Utils/ApiFeatures')

// ep 94
const CustomeError = require('./../Utils/CustomError')

// ep - 93
const asuncErrorHandler = require('./../Utils/asyncErrorHandler')
// ep -67
const Movie = require("./../Models/movieModel");
const { json } = require('express');

// ep 80
exports.getHighestRated = (req,res,next) =>{
    req.query.limit = '5';
    req.query.sort = 'duration';

    next();
}

// ep 68
exports.getAllMovies = async (req,res) =>{
 // ep -69
    try{
        // ep 81
        
        const features = new ApiFeatures(Movie.find(),req.query).filter().limit().paginate();
        let movies = await features.query;
        // ep - 75 for mongoose version 6.0 or less
        const excludeFields = ['sort','page','limit','fileds'];

        const queryObj = {...req.query} // here (...) is spread operator for if we want to sort it or find the specific page so we should use different query object

        excludeFields.forEach((el)=>{
            console.log(el)
            delete queryObj[el];
        })
        console.log(queryObj)
        // ep - 74
        // console.log(req.query)

        let queryStr = JSON.stringify(req.query); // ep 76
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`) // ep -76
        const queryObj1 = JSON.parse(queryStr)  // ep -76
        console.log(queryObj1)  // ep -76

        

        // const movies = await Movie.find(queryObj1); // ep -76
        // let  movies = await Movie.find(queryObj1); // ep -77
        let  query= Movie.find(queryObj); // ep -77

        if(req.query.sort){ // ep - 77
            const sortBy = req.query.sort.split(',').join(' ')
            // query = query.sort(req.query.sort); // ep - 77
            query = query.sort(sortBy); // ep - 77
        }
        else{
            query = query.sort('duration')
        }

        // // LIMITTING FIELDS EP - 78
        // if(req.query.fields){
        //     // query.select('name durationn price ratings')
        //     const fields = req.query.fields.split(',').join(' ')
        //     console.log(fields)
        //     query = query.select(fields)
        // }else{
        //     query = query.select('-__v')
        // }

        // // Pagination ep - 79
        // const page = req.query.page ||1;
        // const limit = req.query.limit*1 || 10;
        // // in pager 1 : 1-10 page 2: 11-20 .....
        // const skip = (page-1) * limit
        // query = query.skip(skip).limit(limit);
        // if(req.query.page){
        //     const moviesCount =await Movie.countDocuments();
        //     if(skip >= moviesCount){
        //         throw new Error('This page is not found')
        //     }
        // }

        movies = await query; // ep - 77
        // const movies = await Movie.find(queryObj); // ep -75

        //find({name:'John', age:{$gte:18}, rating:{$gte:5}})  // here gte means grator or equal to, this not use in code just for knowledge


        // const movies = await Movie.find(req.query);
        // const movies = await Movie.find()
        //             .where('duration')
        //             .equals(req.query.duration)
        //             .where('reLeaseYear')
        //             .equals(req.query.reLeaseYear);  // ep - 76 also advance filtering achieve by this
        res.status(200).json({
            status:"success",
            data:{
                movies
            }
        })
    }catch(err){
        res.status(401).json({
            status:"fail",
            message: err.message
        })
    }
}

// ep 93
// const asuncErrorHandler = (func)=>{
//     return (req,res,next) =>{
//         func(req,res,next).catch(err=>next(err));
//     }

// }

exports.getMovie = asuncErrorHandler (async (req,res,next) =>{
    // ep -69
    // try{
        const movie = await Movie.findById(req.params.id)
        // const movie = await Movie.find({_id: req.params.id})

        //ep - 94
        if(!movie){
            const error = new CustomError('Movie with that ID is not found!',404)
            return next(error);
        }

        res.status(200).json({
            status:"success",
            data:{
                movie
            }
        })
    // }
    // catch(err){
    //     res.status(401).json({
    //         status:"fail",
    //         message: err.message
    //     })
    // }
})

exports.createMovie = asuncErrorHandler( async (req,res,next) =>{
    // const testMovie = new Movie({})
    // testMovie.save()
    // try{
    const movie = await Movie.create(req.body)

    res.status(201).json({
        status: 'successs',
        data:{
            movie
        }
    })
    // }catch(err){
    //     // ep -93
    //     const error = new CustomError(err.message, 400)
    //     next(error);
    //     // res.status(400).json({
    //     //     status:'fail',
    //     //     message: err.message
    //     // })
    //     // console.log(err)
    // }

})


exports.updateMovie =  async (req,res,next) =>{
    // ep-70
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})// here new :true for return the modified document rather than old data and  validator like require or etc
         //ep - 94
         if(!movie){
            const error = new CustomError('Movie with that ID is not found!',404)
            return next(error);
        }
        res.status(200).json({
            status: 'successs',
            data:{
                movie
            }
        })
    }catch(err){
        res.status(401).json({
            status:"fail",
            message: err.message
        })
    }

}

exports.deleteMovie = asuncErrorHandler( async (req,res,next) =>{
    // ep -71
    // try{
        const movie = await Movie.findByIdAndDelete(req.params.id);
         //ep - 94
         if(!movie){
            const error = new CustomError('Movie with that ID is not found!',404)
            return next(error);
        }
        res.status(200).json({
            status: 'successs',
            data:{
             data:null
            }
        })
    // }catch(err){
    //     res.status(401).json({
    //         status:"fail",
    //         message: err.message
    //     })
    // }
})

// let movies = JSON.parse(fs.readFileSync("./data/movies.json"))

// exports.checkId = (req,res,next,value) =>{
//     console.log(' movie ID is '+value);
//     let movie = movies.find(el => el.id=== value*1)
//     if(!movie){
//         return res.status(404).json({
//             status:"fail",
//             message: "Movie with ID "+value+ " is not available"
//         })
//     }
//     next();

// }

// exports.getAllMovies = (req,res)=>{
//     res.status(200).json({
//         status:"sucess",
//         count: movies.length,
//         data:{
//             movies:movies
//         }
//     })
// }

// exports.getMovie = (req,res)=>{
//     console.log(req.params);
//     const id = req.params.id*1; // if you write only req.params.id it's contain string value so by multiply by * 1 it's contain numeric value
//     let movie = movies.find(el => el.id===id)
//     // if(!movie){
//     //     return res.status(404).json({
//     //         status:"fail",
//     //         message: "Movie with ID "+id+ " is not available"
//     //     })
//     // }
//     res.status(200).json({
//         status:"sucess",
//         data: {
//             movie: movie
//         }
//     })
// }


// exports.createMovie = (req,res)=>{
//     // console.log(req.body);
//     const newId = movies[movies.length-1].id + 1;

//     const newMovie = Object.assign({id:newId},req.body)

//     movies.push(newMovie);
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),()=>{
//         res.status(201).json({
//             status: "sucess",
//             data : {
//                 movie: newMovie
//             }
//         })
//     })
//     // res.send('Created')
// }

// exports.updateMovie =  (req,res)=>{
//     let id = req.params.id *1;
//     let movieToUpdate = movies.find(el => el.id === id);
//     // if(!movieToUpdate){
//     //     return res.status(404).json({
//     //         status:"fail",
//     //         message:"No movie object with ID "+id+ " is found"
//     //     })
//     // }
//     let  index = movies.indexOf(movieToUpdate);

//     Object.assign(movieToUpdate, req.body);

//     movies[index] = movieToUpdate;

//     fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
//         res.status(200).json({
//             status:"success",
//             data:{
//                 movie: movieToUpdate
//             }
//         })
//     })
// }

// exports.deleteMovie = (req,res)=>{
//     let id = req.params.id *1;
//     let movieToDelete = movies.find(el => el.id === id);
//     // if(!movieToDelete){
//     //     return res.status(404).json({
//     //         status:"fail",
//     //         message:"No movie object with ID "+id+ " is found"
//     //     })
//     // }
//     const index = movies.indexOf(movieToDelete);

//     movies.splice(index,1);
//     fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
//         res.status(200).json({
//             status:"success",
//             data:{
//                 movie: null
//             }
//         })
//     })

// }


// ep 82
exports.getMovieStats =  asuncErrorHandler( async (req,res,next) =>{
    // try{
        const stats = await Movie.aggregate([
           { $match:{duration: {$gte:150}}} ,
           { $group: {_id: null,
                        avgduration: {$avg: '$duration'}}} // here $group $match are mongodb aggregation statges  operator or states. you can find more operation on mongodb->resources->aggregation pipeline stages
        ]); //An aggregate function is a mathematical computation involving a range of values that results in just a single value expressing the significance of the accumulated data it is derived from. Aggregate functions are often used to derive descriptive statistics.
        res.status(200).json({
            status: 'success',
            count: stats.length,
            data: {
                stats
            }
        })
    // }catch(err){
    //     res.status(401).json({
    //         status:"fail",
    //         message: err.message
    //     })
    // }

})

// ep 83
exports.getMoviesByGenre =  asuncErrorHandler( async (req,res,next) =>{
    // try{
        const genre = req.params.genre;
        const movies = await Movie.aggregate([
            {$unwind:'$genres'}
        ])
        res.status(200).json({
            status: 'success',
            count: stats.length,
            data: {
                stats
            }
        }) 
    // }catch(err){
    //     res.status(401).json({
    //         status:"fail",
    //         message: err.message
    //     })
    // }
})