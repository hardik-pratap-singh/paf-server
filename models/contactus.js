const mongoose = require("mongoose")
const contactusSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : true 
    }, 
    email : {
        type : String , 
    },
    phoneno : {
        type : Number , 
        require : true 
    },
    message : {
        type : String
    }
})

const contactus = mongoose.model('contactus' , contactusSchema) ; 
module.exports = contactus ; 