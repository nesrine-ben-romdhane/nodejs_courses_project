var jwt = require('jsonwebtoken');
module.exports=async(payload)=>{
    // payload hiya donner li t7ebou yraja3helk fi token w jwt.sign tas3an token
     const token = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'1m'})
     return token ;

}