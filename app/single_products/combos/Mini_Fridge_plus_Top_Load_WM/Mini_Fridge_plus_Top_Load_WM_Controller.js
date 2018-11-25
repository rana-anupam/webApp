angular.module('hocketWebsite')
     .controller('Mini_Fridge_plus_Top_Load_WM_Controller', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("Mini_Fridge_plus_Top_Load_WM_Controller controller is loading");

       $(document).ready(function(){
          $(window).scrollTop(0);

          	$http.post('auth/user')
		   			.then(function(res){
		   			//console.log(res.data);
              		$scope.user = res.data;
		   			})
		   			.catch(function(err){
		   				console.log(err);
		   			});


          $scope.isPrime = true;
          $scope.tarrif_1to2 = 650;
       	  $scope.tarrif_3to9 = 630;
       	  $scope.tarrif_10plus = 615;
       	  $scope.flag = 0;

       	  $scope.orderTenure = 18;
       	  $scope.orderPackage = 'prime';

       	  $scope.activePackage('prime');
       });

       $scope.activePackage = function(package){
       	$scope.orderPackage = package;
       	var packageCss = '.' + package ;
        $scope.bannerImageSrc = './app/single_products/combos/images/Appliances/1.png';

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

            $scope.securityDeposit = 1300;
            $scope.productId = 'CA01';

            $scope.tarrif_rate = [0,1600,1250,1134,1075,1040,1017,1000,987,978,970,964,959,954,950,947,944,942,939];
       	if(package == 'basic'){
       		//console.log('I am basic');
       		$scope.itemsIncluded = "2 Core items"
       		$scope.isBasic = true;
       		$scope.tarrif_1to2 = 539;
       		$scope.tarrif_3to9 = 259;
       		$scope.tarrif_10plus = 219;

       	}

       	if(package == 'value'){
       		//console.log('I am value');
       		$scope.itemsIncluded = "2 Core items";
       		$scope.isValue = true;
       		$scope.tarrif_1to2 = 625;
       		$scope.tarrif_3to9 = 600;
       		$scope.tarrif_10plus = 580;

       	}

       	if(package == 'prime'){
       		//console.log('I am prime');
       		$scope.itemsIncluded = "2 Core items";
       		$scope.isPrime = true;
       		$scope.tarrif_1to2 = 650;
       		$scope.tarrif_3to9 = 630;
       		$scope.tarrif_10plus = 615;

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
		   								productName: 'Mini Fridge + Top Load Washine Machine',
		   								productImage: $scope.bannerImageSrc,
		   								itemsIncluded: $scope.itemsIncluded,
		   								deposit: $scope.securityDeposit,
                                                            status:'Order Placed',
                                                            mode:'rent',
		   								date: time
		   							};
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
