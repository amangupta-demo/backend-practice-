const express = require('express');
const port = 3000;
const app = express()
const userModel = require('./models/user.js')

const path = require("path")
// ===== require for auth

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { log } = require('console');
const cookieParser = require('cookie-parser'); 
const user = require('./models/user.js');

// =====

app.set('view engine' ,'ejs')
app.use(express.json())
app.use(express.urlencoded({"extended":true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())


app.get('/',(req,res)=>{
res.render("index")
})

app.post('/create', (req,res)=>{
    let {username,email,password,age} = req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async(err,hash)=>{
            let user = await userModel.create({
                username,
                email,
                password:hash,
                age
            })
            let token = jwt.sign({email},"shhhhhhhhh")
            res.cookie("token",token)
            res.send(user)
            
        })
    })

});

app.get('/login',function(req,res){

res.render('login')
})

app.post('/login', async function(req,res){
    let user = await userModel.findOne({email:req.body.email})
    console.log(user)
    if(!user){
        // res.redirect('/')
        return res.send("something is worng")
    }
        console.log(user.password,"  <=>  ",req.body.password)
         bcrypt.compare(req.body.password, user.password, function(err,result){
            if(result) {
                let token = jwt.sign({email : user.email},'shhhhhh');
                res.cookie("token",token);
                res.send('your are login ')
            }
                else {res.send('your not login')}
 
          })
      
})

app.get('/logout',function(req,res){
    res.cookie("token",'')
    res.redirect('/')
})


app.listen(port,()=>{
    console.log('app is running on : ',port)
})
