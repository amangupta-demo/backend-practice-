const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/postapp')

const userSchems = mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String,
    age:Number,
    profilepic:{
        type:String,
        default:"default.jpg"
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ] 
})

module.exports =  mongoose.model('user',userSchems)