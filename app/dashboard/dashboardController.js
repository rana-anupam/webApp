angular.module('hocketWebsite')
     .controller('dashboardController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("Dashboard controller is loading");

        $http.post('auth/user')
		   			.then(function(res){
				   			console.log("Printing the response");
				   			console.log(res.data);
		              		$scope.user = res.data;
		              		if(!$scope.user.loggedIn){
		              				$(location).attr('href', '/')
		              			}
		              		else{
		              				console.log("Welcome to the Dashboard");
		              				$http.get('api/cart/getOrders').then(function(orders){
										   				console.log("Printing Orders:");
										   				$scope.orders = orders.data;
										   				$scope.noOfOrders = orders.data.length;
										   				console.log($scope.orders);
										   				//console.log("No. of Orders are", $scope.noOfOrders);


										   			}).catch(function(err){
										   				console.log(err);
										   			});
									var pay_req = 'api/cart/getPayments/' + $scope.user.socialId;
								    $http.get(pay_req).then(function(payments){
								    					console.log("The payments are:");
										   				console.log(payments.data);
										   				$scope.payments = payments.data;
										   				$scope.noOfPayments = payments.data.length;
										   				// $scope.orders = orders.data;
										   				// $scope.noOfOrders = orders.data.length;
										   				// console.log($scope.orders);
										   				//console.log("No. of Payments are", $scope.noOfPayments);


										   			}).catch(function(err){
										   				console.log(err);
										   			});	
					   			}
				   			}
		   			).catch(function(err){
		   				console.log(err);
		   			});
       
          $(window).scrollTop(-100);




	
	//$("#tab_myOrders").addClass("active_desktop_dashboard_view");
	$scope.sortBy = "-issue_dateTime";

	$scope.show_desktop_orderSummaryTab = true;
	$scope.show_desktop_paymentsTab = false;

	$scope.changeTab = function(tab){

		//console.log("I am clicked");
			if(tab == "tab_myOrders"){
				//console.log("tab_myOrders is clicked");
				$scope.show_desktop_paymentsTab = false;
				$scope.show_desktop_orderSummaryTab = true;
				$("#tab_myOrders").css("border-left", "4px solid #2d51a3");
				$("#tab_payments").css("border-left", "0px solid #2d51a3");
			}
			else if(tab == "tab_payments") {
				//console.log("tab_payments is clicked");
				$scope.show_desktop_orderSummaryTab = false;
				$scope.show_desktop_paymentsTab = true;
				$("#tab_payments").css("border-left", "4px solid #2d51a3");
				$("#tab_myOrders").css("border-left", "0px solid #2d51a3");
			}
   }

   
   $scope.checkoutRazor = function(paymentfor){
   	console.log("The requested payment is: ");
   	console.log(paymentfor);
	var total_Payment = paymentfor.payment_amount*100; 

	 var options = {
	 	    "key": "rzp_live_SshfcZZqTDMQ4f",
	 	    //Key ID: rzp_live_SshfcZZqTDMQ4f, Key Secret: LpjvOsoRWeq79z01OJqa1pAa
	 	    "amount": total_Payment, // 2000 paise = INR 20
	 	    "name": "Hocket Technologies Pvt. Ltd.",
	 	    "description": "Monthly Rental Payment.",
	 	    "image": "./public/img/hocketLogo.jpg",
	 	    "handler": function (response){
	 	    	console.log("Payment Successfull hitting the callback now");
	 	    	var request = "payu/rentalPayments/success/" + paymentfor.transactionId;
	 	        $http.post(request)
	 			   			.then(function(res){
								UIkit.notification('<div style="font-weight:normal;font-size:0.9em;text-align:center;font-family:Verdana;color:#33691e;border:1px solid #33691e;padding:5px;">The payment is Successfull.</div>', {status:'success',pos: 'top-right'});
								var pay_req = 'api/cart/getPayments/' + $scope.user.socialId;
								    $http.get(pay_req).then(function(payments){
								    					console.log("The payments are:");
										   				console.log(payments.data);
										   				$scope.payments = payments.data;
										   				$scope.noOfPayments = payments.data.length;
										   				$scope.$apply();

										   			}).catch(function(err){
										   				console.log(err);
										   			});	

	 			   			});
		    },

		    "notes": {
		        "email": paymentfor.customer_email,
		        "phone": paymentfor.phoneNo,
		        "internalNotes": paymentfor.internalNotes,
		        "paymentForOrders": paymentfor.paymentForOrders,
		        "txnid": paymentfor.transactionId,
		        "userId": paymentfor.socialId
		    },
		    "theme": {
	 	        "color": "#1e87f0"
	 	    }
	 	};
	 	console.log(options);
	 	var rzp1 = new Razorpay(options);
	     rzp1.open();

	}



//style="padding: 20px 35px;border-bottom:1px solid #eee;font-size:1.05em"

}]);
