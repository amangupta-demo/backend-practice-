const express = require("express")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// 
const path = require('path')
app.use(express.static(path.join(__dirname,'public'))) 
// sari static file image js css yah public naam ke folder me hoga jesa ki second argument me mention hai 

// setup ejs as a view engine 
app.set('view engine','ejs') //hum bta rhe h hamara backend kiya render kare ga 
// render kr ste

const port = 3000;

app.get("/",(req,res)=>{
    res.render("index")
})

app.get('/profile/:username',(req,res)=>{
     const user = req.params.username;
    res.send(`hello ${user}`)
})
app.get('/author/:username/:age',(req,res)=>{
    const user = req.params.username;
    const age = req.params.age;
        res.send(`hello ${user} your age is ${age}`)
})

app.listen(port,()=>{
    console.log("app is runing on : ",port);
})


