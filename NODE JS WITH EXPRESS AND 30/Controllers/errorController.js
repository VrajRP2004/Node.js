// // ep 96
const CustomError = require('./../Utils/CustomError');
const CustomeError = require('./../Utils/CustomError')

// ep - 95
const devErrors = (res,error) =>{
    res.status(error.statusCode).json({
        status:error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error:error
    });
}
// // ep 96
const castErrorHandler = (err)=>{
    const msg = `Invalid value ${err.value} for field ${err.path}`
    return new CustomeError(msg,400)
}

//ep 97
const duplicateKeyErrorHandler = (err)=>{
    const name = err.keyValue.name;
    const msg = `there is already a movie with ${name} please use another name`
    return new CustomeError(msg)
}

//ep 98
const validationErrorHandler = (err)=>{
   const errors =  Object.values(err.errors).map(val=>val.message)
   const errorMessages = errors.join('. ');
   const msg = `Invalid input datat: ${errorMessages}`
   return new CustomeError(msg,400);
}

const prodError = (res,error) =>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status:error.statusCode,
            message: error.message
        }); 
    }else{
        res.status(500).json({
            status:'error',
            message:'somethig went wrong! please try again later'
        })
    }
    
}
//ep 108
const handleExpiredJwr = (err)=>{
    return new CustomError('JWT has expired. Please login again',401)
}
// ep 108
const handleJWTError=(err)=>{
    return new CustomError('Invalid token. Please login agian',401)
}

// ep - 92
module.exports = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error';

    // ep 95
    // if(process.env.NODE_ENV === 'development'){
        // devErrors(res,error)
        // res.status(error.statusCode).json({
        //         status:error.statusCode,
        //         message: error.message,
        //         stackTrace: error.stack,
        //         error:error
        //     });
    // }else if(process.env.NODE_ENV === 'production'){
        // let error = {...error};
        // res.status(error.statusCode).json({
        //     status:error.statusCode,
        //     message: error.message
        // }); 
        // // ep -96
        if(error.name=== 'CastError'){
            error = castErrorHandler(error);
        }
        // ep 97
        if(error.code === 11000)error=duplicateKeyErrorHandler(error)
        //ep 98
        if(error.name === 'ValidationError') error=validationErrorHandler(error)
        // ep 108
        if(error.name === 'TokenExpiredError') error=handleExpiredJwr(error)
        if(error.name === 'JsonWebTokenError') error = handleJWTError(error)
        // ep -95
        prodError(res,error)
    // }
    // res.status(error.statusCode).json({
    //     status:error.statusCode,
    //     message: error.message
    // })
}