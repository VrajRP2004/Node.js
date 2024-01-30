// ep 102
const mongoose = require('mongoose')
const validator = require('validator')

// ep 104
const bcrypt = require('bcryptjs')


// ep 102
// name, email, password, confirmPasswoerd, photo

const userShema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please enter your name.']
    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase: true,
        validate:[validator.isEmail,'Please enter valid email']
    },
    photo:String,
    password:{
        type:String,
        required:[true,'Please enter a password.'],
        minlength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'Please confirm your password.'],
        validate:{
            validator:function(val){
                return val === this.password;
            },
            message:'Password and Confierm Password does not work'
        }
    },
    passwordChanged:Date

})

// ep104
userShema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    //encrypt ths password vefore saving it
    this.password = await bcrypt.hash(this.password,12);

    this.confirmPassword = undefined;
    next();
    
})

// ep 107
userShema.methods.comparePasswordInDb = async function(pswd,pswdDb){
    return await bcrypt.compare(pswd,pswdDb)
}
// ep 109
userShema.methods.isPasswordChanged = async (JWTTimestamp)=>{
    if(this.passwordChanged){
        const pswdChangedTimestamp =parseInt(this.passwordChanged.getTime()/1000);
        console.log(pswdChangedTimestamp,JWTTimestamp)
        return JWTTimestamp<pswdChangedTimestamp;
    }
    return false;
}

//ep 102
const User = mongoose.model('User',userShema)
module.exports = User;