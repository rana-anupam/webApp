const router = require('express').Router();
const User = require('../models/user-model');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
}; 
 
//Send all the products of the cart
router.get('/getCart', authCheck, (req, res) => {
	//console.log(req.body);
	User.findById(req.user._id, function(err,user){
		//console.log(user);
		res.json(user.cart);
	});
}); 

//Add product to the cart
router.post('/addProduct', authCheck, (req, res) => {
	console.log(req.body);
	User.findById(req.body.userId, function(err,user){
		//console.log(user);
		user.cart.push(req.body);
		user.save();
		console.log("Successfully pushed to the cart");
	});
    res.status(200).send('OK');
});

// Update the quantity of the products in the cart
router.post('/updateProductQuantity', authCheck, (req, res) => {
	//console.log(req.body);
	var pathPQ = 'cart.'+req.body.serialNo+'.quantity';
	//console.log(req.body.quantity);
	var updateObj = {$set: {}}
	updateObj['$set'][pathPQ] = req.body.quantity;

	User.findByIdAndUpdate(req.user._id, updateObj,{new: true},(err, user) => {
    // Handle any possible database errors
        if (err){
        	console.log(err);
        }else{
        	console.log("Successfully updated the quantity");
        }
    });
	res.status(200).send('OK');
});



// Delete the product in kart
router.post('/deleteProduct', authCheck, (req, res) => {
	console.log(req.body);
	var pathToProduct = 'cart.' + req.body;
	var updateObj = {$pull: { 'cart' : { 'date' : req.body.date } }};



	User.findByIdAndUpdate(req.user._id, updateObj,{new: true},(err, user) => {
    // Handle any possible database errors
        if (err){
        	console.log(err);
        }else{
        	console.log("Successfully updated the quantity");
        }
    });

	res.status(200).send('OK');
});

//Send all the orders of dashboard
router.get('/getOrders', authCheck, (req, res) => {
	//console.log(req.body);
	User.findById(req.user._id, function(err,user){
		//console.log(user);
		res.json(user.orders);
	});
});


module.exports = router;
