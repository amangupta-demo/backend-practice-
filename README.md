# backend-practice-
for backend

session flash 
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: 'shhh'
    })
    //  resave:false, bar bar save mat karo agr change nahi ho rha to 
    // saveUninitialized:false, koi aesa aata h jo login nahi h yah initialized nahi hai to ush ka session mat bnao 
)
app.use(flash());

note: create a utili file and create and create file generateToken used that token for jwt auth 