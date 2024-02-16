const express = require("express")
const router = express.Router()
const usersController = require("../controlers/users.controlers")
const verefy_token = require("../midellware/auth_verify_token")

// pour uplod d une photo 
const multer  = require('multer')
const AppError = require("../utils/appError")
const diskStorage = multer.diskStorage({
    // destinetion maken l enregistrement de fichier
    destination:function(req,file,cb){
        console.log ("file",file)
        cb(null,"upload")

    },
    // bech nfar9ou kol photo 
    filename:function(req,file,cb){
        const ex = file.mimetype.split("/")[1]
        const filename=`user-${Date.now()}.${ex}`;
        cb(null,filename)
    }
    })
    const fileFilter = function(req,file,cb){
        const imagetype = file.mimetype.split('/')[0]
        if (imagetype == 'image'){
           return cb(null,true)
        }else{
            return cb(AppError.create("file must be an image",400),false)
        }
    }
const upload = multer({ storage: diskStorage ,
fileFilter: fileFilter }) 

router.route("/").get(verefy_token,usersController.getallusers)
router.route("/login").post(usersController.login)
router.route("/register").post(upload.single('avatar'),usersController.register)
module.exports= router