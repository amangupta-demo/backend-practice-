
const express = require("express")
const app = express();
const port = 3000

const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
app.use(cookieParser())


app.get('/',(req,res)=>{
    let token = jwt.sign({ email:"amangupta@gmail.com" }, 'secret');
    res.cookie("secret",token)
    res.send("hello")
})

app.get('/read',(req,res)=>{
   
    let data = jwt.verify(req.cookies.secret,"secret")
    console.log(data)
    // res.send("hello")
})


app.listen(port,()=>{
    console.log("app is running on : 3000")
})