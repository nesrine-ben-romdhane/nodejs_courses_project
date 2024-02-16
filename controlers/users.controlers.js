const asyncWrapper = require("../midellware/asyncWrapper")
const usersModel= require("../models/user.model")
const AppError  = require("../utils/appError")
const httpStatusText = require("../utils/httpStatusText")
const bcrypt= require("bcrypt")

const generate_token = require("../utils/generate_token")



const getallusers = asyncWrapper(async (req,res)=>{
const query = req.query
console.log("header",req.headers)
const limit = query.limit || 10
const page = query.page ||1 
const skip = (page-1)*limit
const users = await usersModel.find({},{__v:false , password:false}).limit(limit).skip(skip)
res.json ({status: httpStatusText.SUCCES,data:{users}})
})




const login = asyncWrapper(async(req,res,next)=>{
   const {email,password} = req.body ;
   if (!email || !password){
    return res.json ({status: httpStatusText.FAIL,message:"email and password is required"})
   }
   const user = await usersModel.findOne({email:email})
   if (!user){
    const error = AppError.create('user not found ',400,httpStatusText.FAIL)
    return next(error)
   }
   const matchpassword = await bcrypt.compare(password,user.password)
  
   if (user && matchpassword){
    const token = await generate_token({email:user.email , id:user._id,role:user.role})
    return res.json ({status: httpStatusText.SUCCES,data:{token},message:{user:"user logged successfuly"}})
   }else{
    const error = AppError.create('something wrong ',500,httpStatusText.Error)
    return next(error)

   }



})


const register =asyncWrapper(async (req,res,next)=>{
    const {firstname,lastname,email,password,role} = req.body ;
    const hashedpassword = await bcrypt.hash(password , 10)
    console.log("test user find",email)
    const olduser = await usersModel.findOne({email})
    console.log("test user find",email)

    if (olduser){
        const error = AppError.create('user alredy exist ',404,httpStatusText.FAIL)
            return next(error)
    }
    // req.file.filename fiha esm l image li cht7otha
    const newuser = new usersModel({firstname,lastname,email,password:hashedpassword,role,avatar:req.file.filename})
    const token = await generate_token({email:newuser.email , id:newuser._id,role:newuser.role})
    //  await jwt.sign({email:newuser.email , id:newuser._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
    console.log("token",token)
   newuser.token=token
    await newuser.save()
    res.status(201).json({status:httpStatusText.SUCCES,data:newuser})


})
module.exports={
    getallusers,
    login,
    register
}