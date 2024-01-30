// ep 103
const User = require('./../Models/userModel')

const asyncErrorHandler = require('./../Utils/asyncErrorHandler')

// ep 106
const jwt = require('jsonwebtoken')

// ep 108
const util = require('util')
//ep 107
const CustomeError = require('./../Utils/CustomError')
const CustomError = require('./../Utils/CustomError')
const signToken = id=>{
    const token = jwt.sign({id}, process.env.SECRET_STR,{
        expiresIn: process.env.LOGIN_EXPIRES
        
    })
}
//ep 103

exports.signup =asyncErrorHandler(async (req,res,next) =>{
    const newUser = await User.create(req.body)

    //ep 107
    const token = signToken(newUser._id);

    // ep 106
    // const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR,{
    //     expiresIn: process.env.LOGIN_EXPIRES
        
    // })

    // ep 103
    res.status(201).json({
        status:'success',
        //ep 106
        token,
        //ep 103
        data:{
            user:newUser
        }
    })

})

// ep 107

exports.login =asyncErrorHandler( async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    // const {email,password} = req.body;
    // Check if email & password is present in request body
    if(!email || !password){
        const error = new CustomeError('Please provide email ID & Password for login in!',400)
        return next(error);
    }

    // Check if user exists with given email
    const user = await User.findOne({email}).select('+password')

    // const isMatch = await user.confirmPasswordInDb(password,user.password)

    // check if email and password is match
    if(!user || !(await user.comparePasswordInDb(password,user.password))){
        const error = new CustomeError("Incorrect email or password'",400)
        return next(error)
    }

    const token = signToken(user._id); 

    res.status(200).json({
        status:"success",
        token
    })
})

// ep 108

exports.protect =asyncErrorHandler( async () =>{
    //1. Read the token and check if if exist
    const testToken = req.header.authorization;
    let token;
    if(testToken && testToken.startWith('bearer')){
       token = testToken.spliy(' ')[1]

    }
    if(!token){
        next(new CustomeError('you are not logged in !',401))
    }

    //2. validate the token
    const decodedToken = util.promisify(jwt.verify)(token,process.env.SECRET_STR)
    console.log(decodedToken)
    //  ep 109
    //3. if the user exists
    const user = await User.findById(decodedToken.id)
    if(!user){
        const error = new CustomError('The user withe ginven token does not exist',401)
        next(error);
    }
    //4. if user changed passwowrd after the token was issued
    const isPssswordChanged = await user.isPasswordChanged(decodedToken.iat)
    if(isPssswordChanged){
        const error = new CustomError('The password has been changed recently. Please login again',401)
        return next(error)
    }

    //5. allow user to accesss route
    req.user = user;
    next();
})
