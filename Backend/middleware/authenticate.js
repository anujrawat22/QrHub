const jwt = require('jsonwebtoken')
const Redis = require("ioredis");
require('dotenv').config()
const redis = new Redis({
    host: 'redis-18684.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 18684,
    password: `${process.env.REDIS}`
});



const authenticate = async (req,res,next)=>{
    const { token } = req.cookies
    
    const blacklisted_token =await redis.sismember('blacklisted_token' , token)
    
    if(blacklisted_token){
        return res.status(401).send({"msg" : "Please login again"})
    }else{
        jwt.verify(token,process.env.TOKEN,(err,decoded)=>{
            if(err){
             return res.status(401).send({"msg" : "Please login again"})
            }else{
                if(decoded){
                    req.UserId = decoded.user_id
                    next()
                 }else{
                    return res.status(401).send({"msg" : "Please login again"})
                 }
            }
        })
    }
}


module.exports = {authenticate}