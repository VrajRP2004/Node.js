// ep-64
const mongoose = require('mongoose')
const fs = require('fs')
const validator = require('validator')

// ep-65 create schema
const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required field!'],
        unique: true,
        maxlength:[100,"Movie name should less than 100 characters"],
        minlength:[2,"Movie name should more than 1 characters"],
        // ep -72
        trim: true
    },
    reLeaseYear:{
        // ep -72
        type:Number,
        required:[true, 'description is required field!'] ,
        trim: true
    },
    duration: {
        type:Number,
        required:[true, 'duration is required field!']
    },
    createdBy: String
    //ep -72
    // ratings: {
    //     type:Number,
    //     default:1.0
    // },
    // totalRating:{
    //     type:Number
    // },
    // releaseYear:{
    //     type: Number,
    //     require:[true, 'releaseYear is required field!']
    // },
    // createdAt:{
    //     type:Date,
    //     default: Date.now()
    // }
    // ep 84
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

// ep 84
movieSchema.virtual('durationInHours').get(function(){
    return this.duration / 60
})

// ep 85

// here pre is for executed before the document is saved in db and you can use post to executed after the document is saved in db. And pre and post are hook
// in nodejs .save() and .create() functions are same
movieSchema.pre('save',function(next){
    // console.log(this)
    this.createdBy = 'MANOJJHA';
    next();
})
movieSchema.post('save',function(doc,next){
    const content = `A new movie document with name ${doc.name} has been created by ${doc.createdby}\n`
    fs.writeFileSync('./Log/log.txt',content,{flag:'a'},(err)=>{
        console.log(err)
    })
    next();
})

// ep -86
movieSchema.pre(/^find/,function(next){
    this.find({duration:{$lte: 200}});
    this.startTime = Date.now();
    next();

})
movieSchema.post(/^find/,function(docs,next){
    this.find({duration:{$lte: 200}});
    this.endTime = Date.now()
    const content = `Query took ${this.endTime - this.startTime} milliseconds to featch document`
    fs.writeFileSync('./Log/log.txt',content,{flag:'a'},(err)=>{
        console.log(err)
    })
    next();

})
// movieSchema.pre('find',function(next){
//     this.find({duration:{$lte: 200}});
//     next();
// })

// ep - 87
movieSchema.pre('aggregate',function(next){
    console.log(this.pipeline().unshift({$match:{duration:{$lte:new Date()}}}))
    next();
})

// ep -65 crete model
const Movie = mongoose.model('Movie',movieSchema);

// ep - 67
module.exports = Movie;