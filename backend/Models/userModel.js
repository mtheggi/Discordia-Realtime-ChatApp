const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required:true,
        minlength: 3,
        maxlength:40
    },
    
    email: {
        type: String,
        required : true,
        minlength: 3,
        maxlength:200,
        unique: true
    },

    password: {
        type:String,
        required : true,
        maxlength: 1024,
        minlength: 3
    } 
},{
    timestamps: true, 
});

const userModel = mongoose.model('User', userSchema); 
module.exports= userModel;