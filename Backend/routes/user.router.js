const {Router} = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Redis = require("ioredis");
const { authenticate } = require("../middleware/authenticate");


const redis = new Redis({
    host: 'redis-18684.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 18684,
    password: `${process.env.REDIS}`
});

const userRouter = Router()


userRouter.get("/data",authenticate,(req,res)=>{
    
    
})

userRouter.post('/signup',async (req,res)=>{
    
    try{
        const {name,email,password} = req.body

        if( !(name && email && password )){
            return res.status(400).send({"msg" : "All fields are required"})
        }

        const olduser =await UserModel.findOne({email})
        
        if(olduser){
            return res.status(409).send({"msg" : "User already exists,Please Login"})
        }

        const encryptedpassword = bcrypt.hashSync(password,5)
        
        const user  = await new UserModel({
            name,
            email,
            password : encryptedpassword,

        })
        
        await user.save()

        const token = jwt.sign({
            userId : user._id,
            email
        },process.env.TOKEN,{expiresIn : 60*60*24*7})

        const refreshtoken = jwt.sign({
            user_id : user._id,
            email
        },process.env.REFRESHTOKEN,{expiresIn : 60*60*24*28})
        res.cookie('token',`${token}`)

        res.cookie('refreshtoken',`${refreshtoken}`)

        await redis.set('token' , `${token}`)
        
        await redis.set('refreshtoken' , `${refreshtoken}`)

        res.status(200).send({"msg" : "Signed up sucessfully",'token' : token, 'refreshtoken' : refreshtoken})
        
    }catch(err){
        console.log("Something went wrong")
        console.log(err)
        return res.status(401).send({"error" : err})
    }

})


userRouter.post("/login",async (req,res)=>{

    try{
        const {email,password} = req.body

        if(!(email && password)){
            return res.status(400).send({"msg" : "All fields required"})
        }

        const user = await UserModel.findOne({email})

        if(user){
            

            const match = await bcrypt.compare(password, user.password);
            if(match){
                const token = jwt.sign({
                    user_id : user._id,
                    email
                },process.env.TOKEN,{expiresIn : 60*60*24*7})
        
                const refreshtoken = jwt.sign({
                    user_id : user._id,
                    email
                },process.env.REFRESHTOKEN,{expiresIn : 60*60*24*28})
                res.cookie('token',`${token}`)
                res.cookie('refreshtoken',`${refreshtoken}`)
                return res.status(200).send({"msg" : "Logged in sucessfully",'token' : token, 'refreshtoken' : refreshtoken})
            }else{
             return res.send({"msg" : "Invalid Credentials"})
            }
        }
    }catch(err){
        console.log(err)
       return res.status(400).send({"Error" : err})
    }
})

userRouter.get("/logout",(req,res)=>{
    const {token,refreshtoken} = req.cookies
    redis.sadd("blacklisted_token",token)
    redis.sadd("blacklisted_refreshtoken",refreshtoken)
    res.clearCookie('token')
    res.clearCookie('refreshtoken')
   return res.status(200).send({"msg" : "User Logged out Sucessfully"})
})



module.exports = {userRouter}