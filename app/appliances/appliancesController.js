angular.module('hocketWebsite')
     .controller('appliancesController', ['$scope','$state','$http', "$stateParams","$rootScope", function($scope, $state ,$http, $stateParams, $rootScope){
       //console.log("appliancesController2 controller is loading");
 
      console.log("Params Id is:");
      console.log($stateParams.id);
      var webpageId = $stateParams.id;

       $(document).ready(function(){
          $(window).scrollTop(0);

$http.post('auth/user')
      .then(function(res){
      $scope.user = res.data;
      $scope.tarrif_rate = [];

      var myVar = setTimeout(myTimer, 600);

      function myTimer() {
                

                  $scope.webPageData = $rootScope.pages.data.pages.appliances[webpageId];
                  $scope.multiplyingFactor = $rootScope.pages.data.multiplyingFactor.factor; 

            for(i=0;i<=18;i++){
                  if(i==0){
                              $scope.tarrif_rate[i] = 0;
                          }
                  else{
                              $scope.tarrif_rate[i] = Math.ceil( (parseInt($scope.webPageData.pricing.mmr) + parseInt($scope.webPageData.pricing.dc)/i) * $scope.multiplyingFactor );
                        }
                      
                  }
            $scope.productsIncluded = [];

            $scope.offers = $rootScope.pages.data.offers;
            $scope.products = $rootScope.products.data.products;
            $scope.faqs = $rootScope.pages.data.faq;

            for(i=0;i<$scope.webPageData.productIncluded.appliances.length;i++){
                  var temp = $scope.webPageData.productIncluded.appliances[i];
                  $scope.productsIncluded.push($rootScope.products.data.products.appliances[temp]);
                 
            }

            $scope.isPrime = true;
            $scope.tarrif_1to2 = 650;
            $scope.tarrif_3to9 = 630;
            $scope.tarrif_10plus = 615;
            $scope.flag = 0;

            $scope.orderTenure = 18;
            $scope.orderPackage = 'basic';

            //console.log($scope.tarrif_rate[18]);

            $scope.activeTenure($scope.tarrif_rate[18],'18');

            $scope.$apply();
      }




	})
	.catch(function(err){
		console.log(err);
      });


          
      });


       $scope.activeTenure = function(tarrif, tenure){
       		$scope.orderTenure = tenure;
       		$scope.orderTarrif = tarrif;
       		//console.log(tenure);
       		//console.log(tarrif);
       		$scope.selectedTenure = tarrif + "/mo for " + $scope.orderTenure + " months";
       		$('.tenureRateSelector').removeClass("uk-open");

			       		$(".tenureRateSelectorButton").mouseenter(function(){
						        $('.tenureRateSelector').addClass("uk-open");
						    });

                                    
       }



       $scope.submitOrder = function(action){
       	var time = moment().add({hours:5,minutes:30}).format('MMMM Do YYYY , h:mm:ss a');
       		if($scope.user.loggedIn){
       			console.log("Add to the Cart");
       			var request = {			      userId : $scope.user.id,
		   								tenure: $scope.orderTenure,
		   								tarrif: $scope.orderTarrif,
		   								quantity:1,
		   								package: $scope.orderPackage,
		   								addon: false,
		   								productId: webpageId,
		   								productName: $scope.webPageData.heading,
		   								productImage: $scope.webPageData.titleImage,
		   								itemsIncluded: $scope.webPageData.productIncludedNumber.basic,
		   								deposit: $scope.webPageData.pricing.sd,
                                                            status:'Order Placed',
                                                            mode:'rent',
		   								date: time
		   							};
                              console.log(request);
		   			$http.post('api/cart/addProduct', request).then(function(){
		   				console.log("successfully added to the cart");
		   				UIkit.notification('<div style="font-weight:normal;font-size:0.75em;text-align:center;font-family:Verdana;color:#4caf50">Successfully added to the cart</div>', {status:'success',pos: 'top-right'})
		   			}).catch(function(err){
		   				console.log(err);
		   			});
                              if(action == 'rentNow'){
                                    //console.log("Rent Now is called");
                                    $(location).attr('href', '/#!/cart')
                              }
                              else{
                                    //console.log("Rent Now is not called"); 
                              }

       		}else{
       			UIkit.notification('<div style="font-weight:normal;font-size:0.75em;text-align:center;font-family:Verdana;color:#f44336">Please login to access the cart</div>', {status:'danger',pos: 'bottom-right'});
       		}
       }

}]);
