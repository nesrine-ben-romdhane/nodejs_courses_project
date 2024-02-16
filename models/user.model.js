const mongoose = require("mongoose")
const validator = require("validator")
const userRole = require("../utils/user_roles")
const userschema = new mongoose.Schema({
    firstname:{
        type : String ,
        require : true,

    },
    lastname :{
        type : String ,
        require:true 
    },
    email:{
        type:String ,
        unique : true,
        require : true,
        validate : [validator.isEmail,"filed must be a valid email address"]
    },
    password : {
        type:String ,
        require:true
    },
    token :{
        type:String
    },
    role : {
        type:String,
        enum:[userRole.ADMIN,userRole.MANGER,userRole.USER],
        default:userRole.USER
    },
    avatar:{
        type:String,
        // fi base de donne ma nsajlouch photo nsajlou esm l photo
        default:"upload/profil.png"
    }

})
module.exports = mongoose.model("User",userschema)