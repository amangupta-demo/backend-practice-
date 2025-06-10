const express = require('express');
const app = express();
const path = require('path')
const userModel = require('./models/user')


app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))



app.get('/' ,(req,res)=>{
    res.render("index");
})

app.post('/create' ,async (req,res)=>{
let {name, email, image,} = req.body;
    let createdUser = await userModel.create({
        // name:req.body.name,
        // email:req.body.email,
        // image:req.body.email
        name:name,
        email:email,
        image:image
    })
    res.redirect("/read")
})
 

app.get('/read' , async(req,res)=>{
    let alluser = await userModel.find()
    res.render("read",{users:alluser});
})


app.get('/edit/:id', async (req,res)=>{
   let user =  await userModel.findOne({ _id:req.params.id });
    res.render('edit',{user,})
})

// app.post('/update' ,async (req,res)=>{
// let {name, email, image,} = req.body;
//     let createdUser = await userModel.updateOne({
//         // name:req.body.name,
//         // email:req.body.email,
//         // image:req.body.email
//         name:name,
//         email:email,
//         image:image
//     })
//     console.log(createdUser)
//     res.redirect("/read")
// })


app.post('/update/:id' ,async (req,res)=>{
let {name, email, image,} = req.body;
    let createdUser = await userModel.findOneAndUpdate({_id:req.params.id},{
        // name:req.body.name,
        // email:req.body.email,
        // image:req.body.email
        name:name,
        email:email,
        image:image
    },{new:true})
    console.log(createdUser)
    res.redirect("/read")
})


app.get('/delete/:id', async (req,res)=>{
     await userModel.findOneAndDelete({ _id:req.params.id });
    res.redirect('/read')
})



app.listen(3000,()=>{
    console.log("app is running on port : ",3000)
})