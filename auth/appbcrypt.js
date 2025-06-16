const express = require("express")
const app = express();
const port = 3000

const bcrypt = require('bcrypt')

// pololololoo
// $2b$10$Ndpnl9BZH4KzYCgmjvD1yOJ56cDFIcS/fHmDo.MZSqy078ZMywX0S

// app.get('/',(req,res)=>{
//     // saltRounds how much you procated it (it take num ) it is first argument 
//     bcrypt.genSalt(10, function(err, salt) {
       
//         // myPlaintextPassword here we put our password
//     bcrypt.hash( "pololololoo", salt, function(err, hash) {
//         console.log(hash)
//         // Store hash in your password DB.
//     });
// });
// })



app.get('/',(req,res)=>{

  bcrypt.compare("pololololoo", "$2b$10$Ndpnl9BZH4KzYCgmjvD1yOJ56cDFIcS/fHmDo.MZSqy078ZMywX0S", function(err, result) {
   console.log(result)
   res.send("working")
});

})



app.listen(port,()=>{
    console.log("app is running on : 3000")
})