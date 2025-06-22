const express = require('express')
const app =  express();
const port = 3000;

const usermodel = require('./models/user.js');
const postModel = require('./models/postmodels.js')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const postmodels = require('./models/postmodels.js');
// ============ file upload
const crypto = require('crypto')
const multer = require('multer')
const path = require('path')
//==========end 

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
   crypto.randomBytes(12, function(err,bytes){
    // path.extname() abc.jpg  .jpg extenction hai jo ush functon se mel jai ga
    const fn = bytes.toString('hex') + path.extname(file.originalname)
    cb(null, fn)

        })
  }
})

const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/test',(req,res)=>{
     
    res.render('test')
})
app.post('/upload',upload.single("image"),(res,req)=>{

   
})

app.post('/register', async (req,res)=>{
    let {username, name, email, password,age} = req.body;
   let user = await usermodel.findOne({email,})
   if(user){
    return res.status(500).send('User already registered')
   }
   bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async (err,hash)=>{
       let user = await usermodel.create({
        username,
        name,
        email,
        password:hash,
        age
    });    
   let token =  jwt.sign({email:email,userid:user._id},'sshh');
    res.cookie("token",token)
    res.send("rester ")
    })
   })
})

app.get('/profile',isLoggedIn, async (req,res)=>{
   let user= await usermodel.findOne({email:req.user.email}).populate('posts');
  console.log(user)
    res.render('profile',{user,})
})

app.get('/like/:id',isLoggedIn, async (req,res)=>{
   let post = await postModel.findOne({_id:req.params.id}).populate('user');
    // await post.likes.push(req.user.userid) 
    // agr nahi hai to 
    console.log(req.user.userid,'userisd')
    if(post.likes.indexOf(req.user.userid)=== -1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }
    await post.save()
    res.redirect('/profile')
})

app.get('/edit/:id',isLoggedIn, async (req,res)=>{
   let post = await postModel.findOne({_id:req.params.id}).populate('user');
    res.render('edit',{post})
})

app.post('/update/:id',isLoggedIn,async (req,res)=>{
   
   await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect('/profile')
})


app.post('/post',isLoggedIn, async (req,res)=>{
    console.log(req.body.content,'req.body')
   let user= await usermodel.findOne({email:req.user.email})
  let post = await postModel.create({
    user:user._id,
    content:req.body.content
    
  })
  await user.posts.push(post._id);
   await user.save()
    res.redirect('/profile')
})


app.get('/login',(req,res)=>{
    res.render('login')
}) 

app.post('/login', async (req,res)=>{
    let {email, password} = req.body;
   let user = await usermodel.findOne({email,})
   if(!user){
    return res.status(500).send('somthing went worng')
}
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token =  jwt.sign({email:email,userid:user._id},'sshh');
            res.cookie("token",token)
            res.status(200).redirect('/profile')
        }else{
            res.redirect('/')
        }
    }) 
      

  
   
   
})


app.get('/logout',(req,res)=>{
    res.cookie('token','')
    res.redirect('/login')
})

function isLoggedIn(req,res,next){
   
    if(req.cookies.token==='') res.redirect('/login');
    else{
       let data= jwt.verify(req.cookies.token,"sshh")
        req.user=data
    }
    next()
}

app.listen(port,()=>{console.log('app is running on 3000')})
