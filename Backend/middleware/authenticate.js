const jwt = require('jsonwebtoken')
const Redis = require("ioredis");
require('dotenv').config()
const redis = new Redis({
    host: 'redis-18684.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 18684,
    password: `${process.env.REDIS}`
});



const authenticate = async (req,res,next)=>{
    
    const  token  = req.headers?.authorization.split(" ")[1]
    
    if(token){
        const blacklisted_token =await redis.sismember('blacklisted_token' , token)
    
        if(blacklisted_token){
            return res.status(401).send({"msg" : "Please login again"})
        }else{
            jwt.verify(token,process.env.TOKEN,(err,decoded)=>{
                if(err){
                 return res.status(401).send({"msg" : "Please login again" , "Error" : err})
                }else{
                    if(decoded){
                        req.body.UserId = decoded.user_id
                        req.body.token = token
                        next()
                     }else{
                        return res.status(401).send({"msg" : "Please login again"})
                     }
                }
            })
        }
    }else{
        return res.status(401).send({"msg" : "Please login again"})
    }
   
}


module.exports = {authenticate}