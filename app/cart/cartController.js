angular.module('hocketWebsite')
     .controller('cartController', ['$scope','$state','$http','$rootScope', function($scope, $state,$http,$rootScope){
       console.log("Cart controller is loading");

       $http.post('auth/user')
		   			.then(function(res){
				   			console.log("Printing the response");
				   			console.log(res.data);
		              		$scope.user = res.data;
		              		

		              		var myVar = setTimeout(myTimer, 600);

      						function myTimer() {
      							$scope.offers = $rootScope.pages.data.offers;
      							$scope.$apply();
      						}
		              		

		              		if(!$scope.user.loggedIn){
		              				$(location).attr('href', '/')
		              			}
		              		else{
					   			$scope.isCartState = true;
						        $scope.isAddressState = false;
						        $scope.isSummaryState = false;
						        $scope.cartSummaryRent = 0;
						        $scope.cartSummaryDeposit = 0;
						        $scope.cartSummaryTotalPayable = 0;
						        $scope.cartSummaryDiscount = 0;
						        $scope.isPromoText = false;
						        $scope.address = {};
						        $scope.payU_hash = "";
						        $scope.payU_key = "pE6ZXlPG";
						        $scope.payU_txnid = $scope.user.id;
						        $scope.payU_amount = "";
						        $scope.payU_productinfo = "";
						        $scope.payU_firstname = $scope.user.firstName;
						        $scope.payU_email = $scope.user.email;
						        $scope.payU_phone = "";
						        $scope.payU_surl = ""
						        //$scope.payU_surl = "http://localhost:3000/payu/success/id/name/mob/flat/colony/landmark/pinCode/productInfo/promoCode/totalPayable";
						        $scope.payU_furl = "/payu/fail";
					   			}
				   			}
		   			)

		   			.catch(function(err){
		   				console.log(err);
		   			}); 

       
          $(window).scrollTop(-100);
       

        


        $scope.proceedButtonText = 'Proceed'; 
      
        $http.get('api/cart/getCart').then(function(cart){
		   				//console.log(cart);
		   				$scope.products = cart.data;
		   				$scope.updateCartSummary();

		   			}).catch(function(err){
		   				console.log(err);
		   			});
		

		$scope.updateQuantity = function(productSerialNo, operation){
			//console.log(productSerialNo);
			if(operation == 'dec'){
				var newQuantity = $scope.products[productSerialNo].quantity - 1;
			}
			if(operation == 'inc'){
				var newQuantity = $scope.products[productSerialNo].quantity + 1;
			}

			//console.log(newQuantity);
			if(newQuantity <= 0){
				UIkit.notification('<div style="font-weight:normal;font-size:0.6em;text-align:center;font-family:Verdana;color:#f44336">You can remove the product by clicking on the remove button.</div>', {status:'danger',pos: 'bottom-right'});
			}
			else{
				var request = {			userId : $scope.user.id,
										serialNo : productSerialNo,
		   								quantity: newQuantity
		   							};
		   			$http.post('api/cart/updateProductQuantity', request).then(function(){
		   				console.log("successfully updated the quantity");
		   				$scope.products[productSerialNo].quantity = newQuantity;
		   				$scope.updateCartSummary();
		   				$scope.applyPromo();
		   			}).catch(function(err){
		   				console.log(err);
		   			});
		   			$scope.applyPromo();
			}
		}

		$scope.deleteProduct = function(productSerialNo){
			var request = {			userId : $scope.user.id,
									serialNo : productSerialNo,
									date: $scope.products[productSerialNo].date
		   							};
			$http.post('api/cart/deleteProduct', request).then(function(){
		   				console.log("successfully deleted the Product");
						   				$http.get('api/cart/getCart').then(function(cart){
								   				console.log(cart);
								   				$scope.products = cart.data;
								   				$scope.updateCartSummary();
								   				$scope.applyPromo();
								   			}).catch(function(err){
								   				console.log(err);
								   			});
		   			}).catch(function(err){
		   				console.log(err);
		   			});
				}


		$scope.updateCartSummary = function(){
						        $scope.cartSummaryRent = 0;
							    $scope.cartSummaryDeposit = 0;
							    $scope.cartSummaryTotalPayable = 0;
							    $scope.payU_productinfo = "";

		   				$.each($scope.products, function (index, product) {
						  //console.log(product.productName);
						  $scope.cartSummaryRent = $scope.cartSummaryRent + (product.tarrif * product.quantity);
						  $scope.cartSummaryDeposit = $scope.cartSummaryDeposit + (product.deposit * product.quantity);	
						  $scope.payU_productinfo = $scope.payU_productinfo + product.productId + ",";		  
						});

						//console.log("The product Info is:");	
						//console.log($scope.payU_productinfo);	
						//$scope.applyPromo();
						$scope.cartSummaryTotalPayable = $scope.cartSummaryDeposit + $scope.cartSummaryRent - $scope.cartSummaryDiscount;
						//console.log('Total Rent', $scope.cartSummaryRent);
						//console.log('Total Deposit', $scope.cartSummaryDeposit);
						//console.log('Total payable Rent', $scope.cartSummaryTotalPayable);
						$scope.payU_amount = $scope.cartSummaryTotalPayable;
		}

		$('#promocode').keyup(function(){
		    this.value = this.value.toUpperCase();
		});


		$scope.applyPromo = function(){
			$scope.isPromoText = true;
			console.log($scope.promoCode);
			$scope.cartSummaryDiscount = 0;
			if($scope.promoCode != undefined){
				if( $scope.promoCode == 'SAVE5'){
						if($scope.cartSummaryRent < 500){
							$scope.promocodeText = 'To apply this code minimum monthly rent should be Rs.500';
							$scope.promocodeTextColor = 'red';
						}
						else{						
						console.log("Apply Save 5");
						$scope.cartSummaryDiscount = Math.ceil($scope.cartSummaryRent * 0.05);
						$scope.promocodeText = 'Congratulations! you have received 5% off on your monthly rent';
						$scope.promocodeTextColor = 'green';
						$scope.updateCartSummary();

						}
				}

				else if( $scope.promoCode == 'SAVE10'){
					if($scope.cartSummaryRent < 1000){
						$scope.promocodeText = 'To apply this code minimum monthly rent should be Rs.1000';
						$scope.promocodeTextColor = 'red';
					}
					else{						
					console.log("Apply SAVE10");
					$scope.cartSummaryDiscount = Math.ceil($scope.cartSummaryRent * 0.1);
					$scope.promocodeText = 'Congratulations! you have received 10% off on your monthly rent';
					$scope.promocodeTextColor = 'green';
					$scope.updateCartSummary();
					}
				}

				else if( $scope.promoCode == 'SAVE15'){
					if($scope.cartSummaryRent < 1500){
						$scope.promocodeText = 'To apply this code minimum monthly rent should be Rs.1500';
						$scope.promocodeTextColor = 'red';
					}
					else{						
					console.log("Apply SAVE15");
					$scope.cartSummaryDiscount = Math.ceil($scope.cartSummaryRent * 0.15);
					$scope.promocodeText = 'Congratulations! you have received 15% off on your monthly rent';
					$scope.promocodeTextColor = 'green';
					$scope.updateCartSummary();
					}
				}

				else if( $scope.promoCode == 'SAVE20'){
					if($scope.cartSummaryRent < 2000){
						$scope.promocodeText = 'To apply this code minimum monthly rent should be Rs.2000';
						$scope.promocodeTextColor = 'red';
					}
					else{						
					console.log("Apply SAVE20");
					$scope.cartSummaryDiscount = Math.ceil($scope.cartSummaryRent * 0.2);
					$scope.promocodeText = 'Congratulations! you have received 20% off on your monthly rent';
					$scope.promocodeTextColor = 'green';
					$scope.updateCartSummary();
					}
				}

				else if( $scope.promoCode == 'NEW25'){
					if($scope.cartSummaryRent < 500){
						$scope.promocodeText = 'To apply this code minimum monthly rent should be Rs.500';
						$scope.promocodeTextColor = 'red';
					}
					else{						
					console.log("Apply NEW25");
					$scope.cartSummaryDiscount = Math.ceil($scope.cartSummaryRent * 0.25);
					$scope.promocodeText = 'Congratulations! you have received 25% off on your monthly rent';
					$scope.promocodeTextColor = 'green';
					$scope.updateCartSummary();
					}
				}

				else{
					
					$scope.promocodeText = 'Promocode applied is either expired or invalid';
					$scope.promocodeTextColor = 'red';
				}
				
			}

		}


		$scope.proceedState = function(){
			//console.log("I am clicked");
			if($scope.isCartState){

				$scope.isCartState = false;
				$scope.isAddressState = true;
				$('.cartHead').removeClass("cart_heading_active");
				$('.addressHead').addClass("cart_heading_active");
				$(window).scrollTop(-100);
			}
			else if($scope.isAddressState){

				if ($scope.validateAddressForm()){				
						console.log("Form is valid");
						console.log($scope.address);
   						$scope.isAddressState = false;
						$scope.isSummaryState = true;
						$('.addressHead').removeClass("cart_heading_active");
						$('.confirmHead').addClass("cart_heading_active");

						console.log("The success redirect URl is:");
						$scope.payU_surl = "http://www.thehocket.com/payu/success/" + $scope.user.id;// + "/" + $('#addressFormName').val() + "/" + $('#addressFormMobile').val() + "/" + $('#addressFormFlat').val() + "/" + $('#addressFormColony').val() + "/" + $('#addressFormPincode').val() + "/" + $scope.payU_productinfo + "/" + $('#promocode').val() + "/" + $scope.cartSummaryRent+ "/" + $scope.cartSummaryDeposit+ "/" + $scope.cartSummaryDiscount+ "/" + $scope.cartSummaryTotalPayable;
						//$scope.payU_surl = "http://localhost:3000/payu/success/id/name/mob/flat/colony/landmark/pinCode/productInfo/promoCode/MonthlyRent/SD/CD/TP";

						console.log($scope.payU_surl);
						// console.log("The Product Info is", $('#promocode').val());
						// console.log("The Promocode Applied is", $('#promocode').val());
						// console.log("The total payable amount is", $scope.cartSummaryTotalPayable);
						$scope.cartSummaryTotalPayable
						$(window).scrollTop(-100);
								var request = {	txnid : $scope.user.id,
												amount : $scope.cartSummaryTotalPayable,
				   								productinfo: $scope.payU_productinfo,
				   								firstname : $scope.payU_firstname,
				   								email: $scope.user.email,
				   								A_Name: $('#addressFormName').val(),
				   								A_Mobile: $('#addressFormMobile').val(),
				   								A_Flat: $('#addressFormFlat').val(),
				   								A_Colony: $('#addressFormColony').val(),
				   								A_Landmark: $('#addressFormLandmark').val(),
				   								A_Colony: $('#addressFormPincode').val(),
				   								Promocode: $('#promocode').val(),
				   								cartSummaryRent: $scope.cartSummaryRent,
				   								cartSummaryDeposit: $scope.cartSummaryDeposit,
				   								cartSummaryDiscount: $scope.cartSummaryDiscount,
				   								cartSummaryTotalPayable: $scope.cartSummaryTotalPayable
				   							};
				   				console.log("The request sent to payU hash is:");
				   				console.log(request);
				   			$http.post('payu/hash', request).then(function(res){
				   				console.log(res);
				   				$scope.payU_hash = res.data;
				   			}).catch(function(err){
				   				console.log(err);
				   			}); 
					}
				else{
					
					console.log('Form is not valid');
					$(window).scrollTop(-100);
				}
				
			}
			else if($scope.isSummaryState){
				//Initiate the payment Now.
				console.log("Initiate the payment Now");
			}
		}


		$scope.validateAddressForm = function(){
			if($('#addressFormName').valid() && $('#addressFormMobile').valid() && $('#addressFormFlat').valid() && $('#addressFormColony').valid()  && $('#addressFormPincode').valid() ){
				return true;
			}else{
				return false; 
			}
		}

		$scope.preceedState = function(){

			if($scope.isAddressState){				
				$scope.isAddressState = false;
				$scope.isCartState = true;
				$('.cartHead').addClass("cart_heading_active");
				$('.addressHead').removeClass("cart_heading_active");
				$(window).scrollTop(-100);
			}
			else if($scope.isSummaryState){				
				$scope.isSummaryState = false;
				$scope.isAddressState = true;
				$('.addressHead').addClass("cart_heading_active");
				$('.confirmHead').removeClass("cart_heading_active");
				$(window).scrollTop(-100);

			}
		}


$scope.checkoutRazor = function(){
var total_Payment = $scope.payU_amount*100; 

var options = {
    "key": "rzp_live_SshfcZZqTDMQ4f",
    //Key ID: rzp_live_SshfcZZqTDMQ4f, Key Secret: LpjvOsoRWeq79z01OJqa1pAa
    "amount": total_Payment, // 2000 paise = INR 20
    "name": "Hocket Technologies Pvt. Ltd.",
    "description": "Welcome to Hocket Family.",
    "image": "./public/img/hocketLogo.jpg",
    "handler": function (response){
    	var request = "payu/success/" + $scope.user.id;
        $http.post(request)
		   			.then(function(res){
		   				$(location).attr('href', '/dashboard')
		   			}
    },
    "notes": {
        "email": $scope.payU_email,
        "phone": $scope.payU_phone,
        "productinfo": $scope.payU_productinfo,
        "txnid": $scope.payU_txnid,
        "userId": $scope.user.id
    },
    "theme": {
        "color": "#1e87f0"
    }
};
var rzp1 = new Razorpay(options);

    rzp1.open();
    e.preventDefault();

}

		

}]);
