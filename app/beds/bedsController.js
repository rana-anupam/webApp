angular.module('hocketWebsite')
     .controller('bedsController', ['$scope','$state','$http', "$stateParams","$rootScope", function($scope, $state,$http, $stateParams, $rootScope){
       //console.log("furnitureController controller is loading");

       console.log("Params Id is:");
       console.log($stateParams.id);
      var webpageId = $stateParams.id;

$(document).ready(function(){
$(window).scrollTop(0);

   $http.post('auth/user')
	.then(function(res){
	$scope.user = res.data;
	$scope.tarrif_rate = [];
	
		   			
	var myVar = setTimeout(myTimer, 900);

    function myTimer() {
    	$scope.webPageData = $rootScope.pages.data.pages.furniture[webpageId];
    	$scope.multiplyingFactor = $rootScope.pages.data.multiplyingFactor.factor; 
    	$scope.offers = $rootScope.pages.data.offers;

       	$scope.faqs = $rootScope.pages.data.faq;

       	$scope.activePackage('prime');



        $scope.$apply();




    	}












	})
	.catch(function(err){
		console.log(err);
	});


          $scope.isPrime = true;
       	  $scope.flag = 0;

       	  $scope.orderTenure = 18;
       	  $scope.orderPackage = 'prime';

       	  
       });

       $scope.activePackage = function(package){
       	$scope.orderPackage = package;
       	var packageCss = '.' + package ;
        $scope.bannerImageSrc = $scope.webPageData.titleImage + package + '.jpg';
		$scope.itemsIncluded = $scope.webPageData.productIncludedNumber[package];


        $scope.productId = webpageId + '-' + package;

       	$('.basic').css('color','#2d51a3');
       	$('.basic').css('background-color','#fff');
       	$scope.isBasic = false;

       	$('.value').css('color','#2d51a3');
       	$('.value').css('background-color','#fff');
       	$scope.isValue = false;

       	$('.prime').css('color','#2d51a3');
       	$('.prime').css('background-color','#fff');
       	$scope.isPrime = false;


       	$(packageCss).css('color','#fff');
       	$(packageCss).css('background-color','#2d51a3');
       	$('.bannerImage').attr("src",$scope.bannerImageSrc);
       	$scope.securityDeposit = $scope.webPageData.pricing[package].sd;

       	//Tarrif Calculation
       	for(i=0;i<=18;i++){
                  if(i==0){$scope.tarrif_rate[i] = 0;}
                  	else{$scope.tarrif_rate[i] = Math.ceil( (parseInt($scope.webPageData.pricing[package].mmr) + parseInt($scope.webPageData.pricing[package].dc)/i) * $scope.multiplyingFactor );}
                  }

        //console.log("$rootScope.products.data.products.furniture", $rootScope.products.data.products.furniture['COWS01']);
        //Products Included Formation
        $scope.productsIncluded = [];
        for(i=0;i<$scope.webPageData.productIncluded.furniture[package].length;i++){
                  var temp = $scope.webPageData.productIncluded.furniture[package][i];
                  $scope.productsIncluded.push($rootScope.products.data.products.furniture[temp]);
                 
            }
         console.log("Products Included:");
         console.log($scope.productsIncluded);




       	if(package == 'basic'){
       		$scope.isBasic = true;
            
       	}

       	if(package == 'value'){
       		$scope.isValue = true;

       	}

       	if(package == 'prime'){
       		$scope.isPrime = true;
       	}  		
       	$scope.activeTenure($scope.tarrif_rate[18],'18');
            		
       }

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

       // $(".tenureRateSelectorButton").click(function(){
       //                                      $('.tenureRateSelector').addClass("uk-open");
       //                                      console.log("mousedown called");
       //                                  });


       $scope.submitOrder = function(action){
       	var time = moment().add({hours:5,minutes:30}).format('MMMM Do YYYY , h:mm:ss a');
       		if($scope.user.loggedIn){
       			console.log("Add to the Cart");
       			var request = {			userId : $scope.user.id,
		   								tenure: $scope.orderTenure,
		   								tarrif: $scope.orderTarrif,
		   								quantity:1,
		   								package: $scope.orderPackage,
		   								addon: false,
		   								productId: $scope.productId,
		   								productName: $scope.webPageData.heading,
		   								productImage: $scope.bannerImageSrc,
		   								itemsIncluded: $scope.itemsIncluded,
		   								deposit: $scope.securityDeposit,
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
                                    console.log("Rent Now is called");
                                    $(location).attr('href', '/#!/cart')
                              }
                              else{
                                    console.log("Rent Now is not called"); 
                              }

       		}else{
       			UIkit.notification('<div style="font-weight:normal;font-size:0.75em;text-align:center;font-family:Verdana;color:#f44336">Please login to access the cart</div>', {status:'danger',pos: 'bottom-right'});
       		}
       }


       $scope.addAddon = function(tarrif, deposit, productId, productName, productImage){
       	var time = moment().add({hours:5,minutes:30}).format('MMMM Do YYYY , h:mm:ss a');
       		if($scope.user.loggedIn){
       			console.log("Add to the Cart");
       			var request = {			userId : $scope.user.id,
		   								tarrif: tarrif,
		   								quantity:1,
		   								addon: true,
		   								productId: productId,
		   								productName: productName,
		   								productImage: productImage,
		   								deposit: deposit,
                                                            status:'Order Placed',
                                                            mode:'rent',
		   								date: time
		   							};
		   			$http.post('api/cart/addProduct', request).then(function(){
		   				console.log("successfully added to the cart");
		   				UIkit.notification('<div style="font-weight:normal;font-size:0.75em;text-align:center;font-family:Verdana;color:#4caf50">Addon added to the cart</div>', {status:'success',pos: 'top-right'})
		   			}).catch(function(err){
		   				console.log(err);
		   			});

       		}else{
       			UIkit.notification('<div style="font-weight:normal;font-size:0.75em;text-align:center;font-family:Verdana;color:#f44336">Please login to access the cart</div>', {status:'danger',pos: 'bottom-right'});
       		}
       }
       		



}]);

