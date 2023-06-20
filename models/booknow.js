const mongoose = require("mongoose")
const booknowSchema = new mongoose.Schema({
    checkin : {
        type : Date , 
        require : true 
    }, 
    checkout : {
        type : Date , 
        require : true 
    },
    fname : {
        type : String , 
        require : true 
    },
    lname : {
        type : String , 
        require : true 
    },
    phone : {
        type : Number,
        // min : 10 , 
        // max : 10 ,  
        require : true 
    },
    email : {
        type : String, 
        require : true 
    },
    adult : {
        type : Number , 
        require : true 
    },
    child612 : {
        type : Number , 
        require : true 
    },
    child6 : {
        type : Number , 
        require : true 
    },
    amount : {
        type : Number , 
        require : true 
    },
    userid : {
        type : String , 
        require : true 
    },
    payment_request_id : {
        type : String , 
        require : true 
    },
    payment_id : {
        type : String , 
        require : true 
    }, 
    payment_status : {
        type : String , 
        default :  "pending"
    },
    isPaymentDone : {
        type : String ,
        default : "N" 
    }
})

const booknow = mongoose.model('booknow' , booknowSchema) ; 
module.exports = booknow ; 

