const { log } = require('console');
const express = require('express')
const app = express();

const fs = require('fs');

// before using ejs you have to install it
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}));

const path = require('path')

app.use(express.static(path.join(__dirname,"public")));


        app.get('/',function(req,res){
            fs.readdir(`./files`, function(err, files){
                console.log(files)
            
                res.render('index',{files:files})
            })

        })

            // utf-8 ka mtlb h hamari file english me read hogi 
         app.get('/file/:filename',function(req,res){
            // fs.readFile(`./files/${req.params.filename}`, "utf-8")
           
            fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
                // console.log(err)
                res.render('show',{filename:req.params.filename, filedata:filedata})
            })

        })

        app.get('/edit/:filename',function(req,res){
            console.log(req.params.filename)

            // fs.rename(`./files/${req.params.filename}`, `./files/${req.bady.title}.txt` , function(err){
            //     console.log(err)
            // })
            res.render('edit',{previousname : req.params.filename})
        })

        app.post('/edit',function(req,res){
            console.log(req.body.previous," ",req.body.new)
            fs.rename( `./files/${req.body.previous}`,`./files/${req.body.new}.txt` , function(err){
                console.log(err)
            })
            // res.render('edit',{previousname : req.params.filename})
            res.redirect('/')
        })
 
        app.post('/create' ,function(req,res){
            fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`,req.body.details, function(err){
                console.log(err)
            })
            res.redirect('/')
        }) 

app.listen(3000,()=>{
    console.log(" app is working on " ,3000)
})