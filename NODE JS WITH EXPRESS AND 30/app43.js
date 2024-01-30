// import package
const express = require('express');
const morgan = require('morgan')
const moviesRouter = require('./Routes/moviesRoutes')
// ep 103
const userRouter = require('./Routes/authRouter')

// ep 92
const CustomeError = require('./Utils/CustomError')
// ep 92
const globalErrorHandler = require('./Controllers/errorController')
let app = express();

const logger = function(req,res,next){
    console.log("Custom middleware called")
    next();
}

app.use(express.json())
if(process.env.NODE_ENV === 'developpmnet'){
    app.use(morgan('dev'))
}
// app.use(morgan('dev'))

// ep-46
app.use(express.static('./public'))

// app.use(logger);


app.use('/api/v1/movies',moviesRouter)

// ep 103
app.use('/api/v1/users',userRouter)

// ep 90
app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     message: `Can't find ${req.originalUrl} on the server!`
    // })    
    // ep 91
    // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    // err.status = 'fail'
    // err.statusCode = 404;
    const err = new CustomeError(`Can't find ${req.originalUrl} on the server!`,404)
    next(err);
})

// ep 91
app.use(globalErrorHandler)

// // create a server

// const port = 3000;
// app.listen(port,()=>{
//     console.log('server has started...')
// })

module.exports = app;