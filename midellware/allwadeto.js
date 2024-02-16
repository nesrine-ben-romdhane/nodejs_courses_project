const AppError = require("../utils/appError")
const httpStatusText = require("../utils/httpStatusText");

module.exports=(... roles)=>{
    console.log("roles",roles)
    return(req,res,next)=>{
        if (!roles.includes(req.curentuser.role)){
            const error = AppError.create('this role is not ahthorized',401,httpStatusText.Error)
            return next(error)
        }
        next()
    }
}