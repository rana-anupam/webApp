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
					   			}
				   			}
		   			).catch(function(err){
		   				console.log(err);
		   			});
       
          $(window).scrollTop(-100);


    $http.get('api/cart/getOrders').then(function(orders){
		   				//console.log(cart);
		   				$scope.orders = orders.data;
		   				$scope.noOfOrders = orders.data.length;
		   				console.log($scope.orders);
		   				console.log("No. of Orders are", $scope.noOfOrders);


		   			}).catch(function(err){
		   				console.log(err);
		   			});

}]);
