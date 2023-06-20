const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const db = require("./db.js");
db();

const bid = require('./routes/bid.js'); 
app.use("/api/bid" , bid) ; 

const cookie = require('./routes/cookie.js'); 
app.use("/cookie" , cookie) ; 

const contactus = require("./routes/contactus.js"); 
app.use("/" , contactus) ; 


app.listen(PORT, () => {
  console.log("Server running on PORT 5000");
})