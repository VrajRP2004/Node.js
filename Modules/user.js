const events = require('events')

module.exports = class extends events.EventEmitter{ // here EventEmitter is base class
    constructor(){
        super(); // when we use super so it's call the constructor of base class and here base class is EventEmitter so it's called EventEmitter 
    }
}