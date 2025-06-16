// talking about cookie 

const express = require("express")
const app = express();
const port = 3000



// to read cookies
const cookieParser  = require('cookie-parser')
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.cookie("name","aman")
    res.send("hello")
})

app.get('/read',(req,res)=>{
   console.log(req.cookies) // read cookie
    res.send("read")
})

app.listen(port,()=>{
    console.log("app is running on : 3000")
})