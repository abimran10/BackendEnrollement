const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const studentSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    mobilenumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    semester:{
        type: String,
        required: true
    },
});
module.exports = mongoose.model('student', studentSchema );