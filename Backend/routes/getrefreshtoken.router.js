const express = require("express")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const getrefreshtoken = express.Router()
const Redis = require("ioredis");

const redis = new Redis({
    host: 'redis-18684.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 18684,
    password: `${process.env.REDIS}`
});

getrefreshtoken.get("/",(req,res)=>{
   const {refreshtoken} = req.cookies
   
   try{
    if(!(refreshtoken)){
       return res.status(404).send({"msg" : "Please login again"})
       }else{
        jwt.verify(refreshtoken,process.env.REFRESHTOKEN,(err,decoded)=>{
             if(err){
               return res.status(401).send({"msg" : "Something went wrong","Error" : err})
             }else{

                let newtoken = jwt.sign(decoded,process.env.TOKEN,{expiresIn : 60*60*24*7})
                res.cookie('token',newtoken)
                redis.set('token',newtoken)
                return res.status(200).send({"msg" : "Logged in sucessfully"})
             }
        })
       }
       
   }catch(err){
    console.log(err)
    res.status(400).send({"msg" : "Something went wrong"})
   }
   


})


module.exports = {getrefreshtoken}