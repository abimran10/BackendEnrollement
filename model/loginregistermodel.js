const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const loginregisterSchema = new Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens:[{
        token:{ 
            type: String,
        }
    }] 

});
module.exports = mongoose.model('loginregister', loginregisterSchema );