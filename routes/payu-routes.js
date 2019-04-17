const router = require('express').Router();
const User = require('../models/user-model');
const OrderHistory = require('../models/orderHistory-model');
const RentalPayment = require('../models/rentalPayments-model');
// const OrderNo = require('../models/orderNo-model');

const nodemailer = require("nodemailer");
const ejs = require('ejs');
const fs = require('fs');
var sha512 = require('js-sha512');
var moment = require('moment');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
};




router.post('/success/:id',function(req,res){
  console.log('--------Payment Success--------');
  console.log('--------CONSOLE LOGGING The data passed in URL--------');
  console.log(req.params.id);
  	//console.log(req.body);

	User.findById(req.params.id, function(err,user){
    console.log("Logging the user");
		//console.log(user);
		var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var orderNo = 0;

    OrderHistory.find().exec(function (err, results) {
      orderNo = 18000 + results.length + 1;
      console.log("Order No: ", orderNo);


            var orderContent = {
              orderNo: orderNo,
              orderTime: time,
              orderSummary : user.cart,
              paymentSummary : user.tempOrder,
              status: "Order Placed"
            };
            //console.log(orderContent);
            user.orders.push(orderContent);
            user.save();

            new OrderHistory(orderContent).save().then(() => {
                            res.redirect('/');
                              var updateObj = {$pull: { 'cart' : { 'userId' : req.params.id } }};
                              User.findByIdAndUpdate(req.params.id, updateObj,{new: true},(err, user) => {
                                // Handle any possible database errors
                                    if (err){
                                      console.log(err);
                                    }else{
                                      console.log("Successfully updated the quantity");
                                    }
                                });
                        });

                                    // Email Sending Code .................................................................

                        const key = require('../key.json');
                        // Change this to one of your email addresses in the organisation
                        const YOUR_EMAIL_ADDRESS = 'order@thehocket.com';
                        // Change this to the receiver to the mail
                        const SEND_TO = user.email;

                          console.log("Reached the start function");
                          const transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                              type: 'OAuth2',
                              user: YOUR_EMAIL_ADDRESS,
                              serviceClient: key.client_id,
                              privateKey: key.private_key
                            },
                          });

                        //console.log("Loading ejs now");
                        var cName = 'Subham'
                        ejs.renderFile(__dirname + "/../orderConfirmationMail.ejs", { customerName: user.firstName }, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            var mainOptions = {
                                from: '"Hocket Rentals" <order@thehocket.com>',
                                to: SEND_TO,
                                subject: 'Order Confirmation',
                                html: data
                            };
                            //console.log("html data ======================>", mainOptions.html);
                            transporter.sendMail(mainOptions, function (err, info) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });
                        }

                        });

                        //..........................................................................................
            console.log("Successfully placed order");


    });
		
	});
    
});

// Rental Payment Routes
router.post('/rentalPayments/success/:trxId',function(req,res){
  console.log('--------Payment Success--------');
  console.log('--------CONSOLE LOGGING The data passed in URL--------');
  console.log(req.params.trxId);
  //console.log(req.body);
  // var updateObj = {$set: {}}
  // updateObj['$set'][status] = "paid";

  RentalPayment.update({transactionId: req.params.trxId}, {$set: { status: 'paid' }}).then((payment) => {
            //console.log("The update payment is:");
            //console.log(payment);
            res.send("OK");
        });

    
});


router.post('/fail',function(req,res){
  console.log('--------Payment Failed--------');
  console.log(req.body);
  res.send('Payment Failed');
});



// var dataSequence = KEY+'|'+reqData.txnid+'|'+reqData.amount+'|'+reqData.productinfo+'|'+reqData.firstname+'|'+reqData.email+'|||||||||||'+SALT;
// const hash = sha512(dataSequence);
//var hash = "e1c0b441df1629d32f906e38ae52d3361265aef7e0bfc2ec6a6ab38fc4642c1ed3004eccf16401a42fb77f8f8a4823ad97daf46f9b28e6a59fc779553a6f6ae0"

router.post('/hash',function(req,res){
  //var dataSequence = 'pE6ZXlPG'+'|'+'asc123'+'|'+'1'+'|'+'Product1'+'|'+'Anupam'+'|'+'anupam.rana2014@vit.ac.in'+'|||||||||||'+'6sVjktuUBJ';
  var dataSequence = 'pE6ZXlPG' +'|'+req.body.txnid+'|'+req.body.amount+'|'+req.body.productinfo+'|'+req.body.firstname+'|'+req.body.email+'|||||||||||'+'6sVjktuUBJ';
  const hash = sha512(dataSequence);
  console.log(hash);
  res.send(hash);

//console.log(req.body);
 var tempOrderContent = {
                          A_Name: req.body.A_Name,
                          A_Mobile: req.body.A_Mobile,
                          A_Flat: req.body.A_Flat,
                          A_Colony: req.body.A_Colony,
                          A_Landmark: req.body.A_Landmark,
                          A_Colony: req.body.A_Colony,
                          Promocode: req.body.Promocode,
                          productinfo: req.body.productinfo,
                          cartSummaryRent: req.body.cartSummaryRent,
                          cartSummaryDeposit: req.body.cartSummaryDeposit,
                          cartSummaryDiscount: req.body.cartSummaryDiscount,
                          cartSummaryTotalPayable: req.body.cartSummaryTotalPayable           

 }
  var pathPQ = 'tempOrder';
  var updateObj = {$set: {}}
  updateObj['$set'][pathPQ] = tempOrderContent;

  User.findByIdAndUpdate(req.user._id, updateObj,{new: true},(err, user) => {
    // Handle any possible database errors
        if (err){
          console.log(err);
        }else{
          console.log("Successfully updated the tempOrder");
        }
    });
});

//--------------

module.exports = router;
