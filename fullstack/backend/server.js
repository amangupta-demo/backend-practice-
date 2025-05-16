// const express = require('express')
// syntex of comman js for import 

import express from 'express';
//use syntex to prevent the error 
// type : module
// syntex of module js

const app = express()

const port = process.env.PORT || 3000; 
//ether used process.env.port or 3000

app.get('/',(req,res)=>
{
    res.send('<h1>hello </h1>')
})


//get a list of 5 jokes

const jokes =[
    {
        id: 1,
        title: "a joke",
        content: "Why don’t scientists trust atoms? Because they make up everything!"
    },
    {
        id: 2,
        title: "second joke",
        content: "Why did the scarecrow win an award? Because he was outstanding in his field!"
    },
    {
        id: 3,
        title: "third joke",
        content: "I told my wife she was drawing her eyebrows too high. She looked surprised."
    },
    {
        id: 4,
        title: "Forth joke",
        content: "Why can't you hear a pterodactyl go to the bathroom? Because the 'P' is silent!"
    },
    {
        id: 5,
        title: "Fifth joke",
        content: "Parallel lines have so much in common… it’s a shame they’ll never meet."
    }
]


app.get('/api/jokes',(req,res)=>{
    res.send(jokes);
})

app.listen(port)