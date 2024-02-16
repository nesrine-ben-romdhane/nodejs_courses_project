var jwt = require('jsonwebtoken');
const httpStatusText = require("../utils/httpStatusText");
const AppError = require('../utils/appError');
const verefy_token = (req,res,next)=>{
    const authHeader = req.headers["Authorization"] ||  req.headers["authorization"]
    console.log('headers',authHeader )
    if (!authHeader){
        const error = AppError.create('token is required',401,httpStatusText.Error)
        return next(error)
      
    }
    // 5dhe l token ki 3mal split bech ye5ou men ba3d kelmt bearer 
    const token = authHeader.split(' ')[1]
    try{
        const curentuser = jwt.verify(token , process.env.JWT_SECRET_KEY)
        console.log("decodedtoken",curentuser)
        // bel midelware najmou nzidou w na9sou m req w tebda disponible lel midelware li ma3moulha ba3dha finroute
        req.curentuser=curentuser;
        next()
    }
    catch(err){
        const error = AppError.create('invalid token',401,httpStatusText.Error)
        return next(error)
      
    }
  
}
module.exports=verefy_token