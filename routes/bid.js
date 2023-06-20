const express = require('express')
const router = express.Router();
const {pay , callback , afterthere} = require("../controllers/bid") ; 


//post request par cookie set nhi hoti //only on get request 
//http://localhost:5000/api/pay
router.post("/pay", pay);
//ye callback ka kaam tab aata hai jab aapki payment succesfull ho gyi hai tab 
//matlab debit card details , expiry and cvv wagairah daal chuke ho tab 
//is route pe aata hai 
router.get('/callback', callback);
router.get("/afterthere", afterthere);


module.exports = router;

