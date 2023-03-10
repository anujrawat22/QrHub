require('dotenv').config()
const express = require('express')
const {connection} = require('./config/db')
const {userRouter} = require('./routes/user.router')
const cookieParser = require('cookie-parser')
const {getrefreshtoken} = require("./routes/getrefreshtoken.router")
const { authenticate } = require('./middleware/authenticate')
const { qrRouter } = require('./routes/qr.router')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors({
    origin : "*"
}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/user",userRouter)

app.use("/getrefreshtoken",getrefreshtoken)

app.use("/qr",qrRouter)

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