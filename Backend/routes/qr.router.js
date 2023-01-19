const express = require("express")



const qrRouter = express.Router()


qrRouter.post("/generate",(req,res)=>{
res.send("hello")
})







module.exports = { qrRouter }