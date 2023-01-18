require('dotenv').config()
const express = require('express')
const {connection} = require('./config/db')
const {UserModel} = require('./model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())

app.post('/signup',async (req,res)=>{
    
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
            user_id : user._id,
            email
        },process.env.TOKEN,{expiresIn : 60*60*24*7})

        const refreshtoken = jwt.sign({
            user_id : user._id,
            email
        },process.env.REFRESHTOKEN,{expiresIn : 60*60*24*28})
        res.cookie('token',`${token}`)
        res.cookie('refreshtoken',`${refreshtoken}`)
        res.status(200).send({"msg" : "Signed up sucessfully",'token' : token, 'refreshtoken' : refreshtoken})
        
    }catch(err){
        console.log("Something went wrong")
        console.log(err)
        return res.status(401).send({"error" : err})
    }

})


app.post("/login",async (req,res)=>{

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
        res.status(400).send({"Error" : err})
    }
})



app.listen(process.env.PORT,async ()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
   console.log(`Listening on PORT ${process.env.PORT}`)
})