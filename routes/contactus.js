const express = require("express");
const app = express();
const nodemailer = require("nodemailer")
const contactus = require("../models/contactus");
const router = express.Router() ; 
const { body, validationResult } = require('express-validator');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodemailer5901@gmail.com',
        pass: 'anuaatoyxexjnxln'
    }
});



router.post("/contactus", [
    body('email', 'Enter a valid email').isEmail(),
    body('phoneno', 'Enter a Valid Phone Number of 10 digits ! ').isLength({ min: 10, max: 10 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, phoneno, message } = req.body;
        await contactus.create({ name, email, phoneno, message });

        var mailOptions = {
            from: 'nodemailer5901@gmail.com',
            to:'peakandfind2021@gmail.com' ,
            // to: 'hardikjanuary2021@gmail.com',
            subject: `${name} Wants to Connect`,
            html: `<div className="block">
                <h3>Name : ${name} </h3>
                <h5>Email : ${email} </h5>
                <h5>Phone No. : ${phoneno} </h5>
                <h5>Message : ${message} </h5>
              </div>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // console.log(error);
                console.log("error occurred in nodemailer")
            } else {
                console.log("Email Sent")
                // do something useful
            }
        });
        return res.status(200).json({ "success": true });

    } catch (err) {
        res.json({ "error": err.message });
    }




})


module.exports = router  ; 
