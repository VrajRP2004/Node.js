// ep 92
class CustomError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400  &&  statusCode < 500 ? 'failj' : 'error';

        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = CustomError

//const error = new CustomeError('some error message', 404)