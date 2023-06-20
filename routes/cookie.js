const express = require("express") ; 
const app = express() ;
const cookieParser = require('cookie-parser')
app.use(express.json()); 
// let’s you use the cookieParser in your application
app.use(cookieParser());

const router = express.Router() ; 

router.get("/set" , (req ,res) => {
    res.cookie('name' , 'hardik') ; 
    res.cookie('age' , '17') ; 
    res.cookie('school' , 'tps') ; 
    res.redirect('http://localhost:5000/cookie/get') ; 
})

router.get("/get" , (req, res) => {
    // console.log(req.cookies) ; 
    res.redirect('http://localhost:5000/cookie/hamare'); 
})

//get route ke andar usi par redirect kar sakte hai jo get route hai 
//get route se post par redirect karne se wo le cannot get cookie/hamare le rha hai 

router.get("/hamare" , cookieParser() ,  (req ,res) => {
    // console.log(req.cookies) ; 
    console.log(req.cookies); 
    res.send("got it !") ; 
})

// without cookieParser(), showing undefined 
// with cookieParser(), showing the actual cookies 


router.get('/delete' , (req , res) => {
    res.clearCookie('school')  ;

    res.send("cookie deleted") ; 
})


module.exports = router; 