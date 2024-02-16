const express = require("express")
require('dotenv').config()
const cors = require('cors')
const app = express()
const path = require("path")

const httpStatusText = require("./utils/httpStatusText")
app.use(cors())
app.use(express.json())
const routercoures = require("./router/router.courses")
const routerUser = require("./router/router.users")
app.use("/api/course",routercoures)
app.use("/api/users",routerUser)
app.use("/upload", express.static(path.join(__dirname,"upload")))
// global midelware for not found route 
app.all("*",(req,res,next)=>{
    return res.status(404).json({status:httpStatusText.Error,message:"route not found"}) 
})
// global error handler
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({status:error.statusText|| httpStatusText.Error,message:error.message,code:error.status,data:null})
})
const mongoose = require("mongoose")
const url = process.env.MONGOURL
// const url = "mongodb+srv://nesrinebenromdhane:nesrine@courses.xjewoka.mongodb.net/<dbasename>?retryWrites=true&w=majority"
mongoose.connect(url).then(()=>{
    console.log("mongodb connect success")
})



app.listen(process.env.PORT,()=>{
    console.log(`listen on port ${process.env.PORT}`)
})