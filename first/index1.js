//  study about file system 

const fs = require('fs') 

// fs.writeFile
// fs.appendFile
// fs.copyFile
// fs.rename
// fs.unlink
// fs.rm // delete the folder 

// how to create a folder ,how to read a folder  

fs.writeFile("hey.txt","hey hello kaise ho ",function(err){
if(err){
    console.log("error hai")
}else {
    console.log("done")
}
})

//  this code is over right 

// const  con = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, magni!"
// fs.writeFile("hey.txt",con,function(err){
// if(err){
//     console.log("error hai")
// }else {
//     console.log("done")
// }
// })


// to add something forther we used append 
const  con = "  \n Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, magni!"
fs.appendFile("hey.txt",con,function(err){
if(err){
    console.log("error hai")
}else {
    console.log("done")
}
})

fs.rename("hey.txt","hello.txt",function(err){
if(err){
    console.log("error hai")
}else {
    console.log("done")
}})

