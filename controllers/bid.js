const Insta = require('instamojo-nodejs');
const booknow = require("../models/booknow");
const url = require('url');
const alert = require("alert")

const pay = (req, res) => {


	console.log("Inside bid.js");


	try {
		

	Insta.setKeys(process.env.INSTA_API_KEY, process.env.INSTA_AUTH_KEY);

	const data = new Insta.PaymentData();
	Insta.isSandboxMode(false);

	data.purpose = req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name = req.body.buyer_name;
	data.redirect_url = req.body.redirect_url;
	data.email = req.body.email;
	data.phone = req.body.phone;
	data.userid = req.body.user_id;
	data.send_email = false;
	data.webhook = 'http://www.example.com/webhook/';
	data.send_sms = true;
	data.allow_repeated_payments = false;

	Insta.createPayment(data, async function (error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse(response);
			const redirectUrl = responseData.payment_request.longurl;

			
		
			const myarr = redirectUrl.split("/") ; 
			const paymentReqId = myarr[myarr.length - 1] ; //myarr.size() doesn't works here 
			console.log(paymentReqId) ; 

			if(redirectUrl){
				const savedData =  await booknow.create({ 
					checkin : req.body.checkin, 
					checkout : req.body.checkout , 
					fname : req.body.fname , 
					lname : req.body.lname , 
					phone : req.body.phone , 
					email : req.body.email , 
					adult : req.body.adult  ,
					child612 : req.body.child612 , 
					child6 : req.body.child6 , 
					amount : req.body.amount , 
					userid : req.body.userid , 
					payment_request_id : paymentReqId
				 });

				//  console.log(savedData) ; 
			}
			

			res.status(200).json(redirectUrl);
		}
	});

} catch (error) {
		res.json("some error occurred in route api/bid/pay") ; 
}

}

const callback = async (req, res) => {

	try {
		let url_parts = url.parse(req.url, true),
			responseData = url_parts.query;
		//response data looks like this 
		// [Object: null prototype] {
		// 	payment_id: 'MOJO3602K05A21718037',
		// 	payment_status: 'Credit',
		// 	payment_request_id: 'da1883669c3542a3abaa20684943a5e8'
		//   }

		if (responseData.payment_id) {
			let payment_id = responseData.payment_id;
			let payment_status = responseData.payment_status;
			let payment_request_id = responseData.payment_request_id;
			// console.log("Inside the callback success : " + userId);


			const filter = {payment_request_id : payment_request_id} ;
			
			//try it in sigle without copying 
			const update = {
				payment_status : payment_status , 
				payment_id : payment_id , 
				isPaymentDone : "Y" 
			}
			
			let doc = await booknow.findOneAndUpdate(filter, update , {
				new : true 
			});

			// console.log(doc)  ; 

			res.redirect('/api/bid/afterthere');
		}


	} catch (error) {
		res.send("error occurred !")
	}
}


const afterthere =  (req, res) => {
	alert("Your Payment Is Successful ! We will reach out to you very soon !")
	res.redirect("https://peakandfind.com/index.html");
}



module.exports = {pay , callback , afterthere}
