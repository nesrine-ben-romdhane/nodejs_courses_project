

const asyncWrapper = require("../midellware/asyncWrapper")
const course= require("../models/course.model")
const httpStatusText = require("../utils/httpStatusText")
const AppError =require("../utils/appError")

// const cours = cours.find(price:{$gt:800})
// $gt: hiya mongodb operator tjiblk l cours li l price akeber men 800
// const cours = cours.find(price:{$gt:800},{"__V":false , "price":false})
// kif ma n7ebouch l price mithel w __v yodhehroulna fi reponce ta3 requette





const allcourse = async (req,res)=>{
    //  http://localhost:4001/api/course/allcourse?limit=2&page=1
    // chne5dhou variable m api esha query 
    const query =req.query
    const limit =query.limit || 10
    const page = query.page || 1
    // ['p1','p2','p3','p4','p5','p6','p7','p8']  bech na3rfou 9adech ch neskipiw mithel fi page 2 w limit b 2 chye5dh page 1 fiha 2 produit
    const skip = (page-1)*limit
    const courses = await course.find({},{"__v":false}).limit(limit).skip(skip)
     // skip bech kif n3awdou nenzou ta3tina les course li ba3d 
    

    res.json({status:httpStatusText.SUCCES,data:courses})
}








const addcourse = async(req,res)=>{
    // //notEmpty signfi que not vide
    console.log(req.body)
    // //validationResult est la resulta de la validation li 3malneha fi midelware 
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({status:httpStatusText.FAIL , data:errors.array()})
    // }
 
///////////////////////////////////////////////////////////////////////////
        const newcourse = new course (req.body)
        await newcourse.save()
        res.status(201).json({status:httpStatusText.SUCCES,data:newcourse})

}

const getcourse= asyncWrapper(
    async(req,res,next)=>{
        const course = course.findById(req.params.id)
        if(!course){
            const error = AppError.create('not found course',404,httpStatusText.FAIL)
            return next(error)
        }
        return res.json({status:httpStatusText.SUCCES,data:course})
    }
)

const updatecourse =
 async(req,res)=>{
    // const courseid = +req.params.courseid ;
    const courseid = req.params.courseid
    console.log ("courseid",courseid)

    // findByIdAndUpdate retern the find course
    const updatecourse=await course.updateOne({_id:courseid},{$set:{...req.body}})
   
    return res.status(200).json({status:httpStatusText.SUCCES,data:updatecourse})
        //     try{
        //  }
        //  catch(err){
        //     return res.status(404).json({status:httpStatusText.Error,data:null,message:err.message}) 
        //  }

}

const deletecourse =async (req,res)=>{
    // const courseid = +req.params.courseid ;
    const courseid = req.params.courseid
    try{


    const coursedelete = await course.findByIdAndDelete(courseid)
    res.status(200).json({success:true})
    }catch(err){
        console.log(err)
        res.status(401).json({status:httpStatusText.SUCCES,data:null})

    }
} 
module.exports= {
    getcourse,
    allcourse,
    addcourse,
    updatecourse,
    deletecourse
}