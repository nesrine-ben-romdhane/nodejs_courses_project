// thandel l error li fi fnction lkol w teb3athha l global midelware
module.exports=(asyncFN)=>{
    return (req,res,next)=>{
        asyncFN(req,res,next).catch((err)=>{next(err)})
    }}

   