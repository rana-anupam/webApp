angular.module('hocketWebsite')
     .controller('tv_Controller', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("tv controller is loading");

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
        $scope.bannerImageSrc = './app/single_products/appliances/tv/tv_' + package + '.jpg';

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

       	if(package == 'basic'){
       		//console.log('I am basic');
       		$scope.itemsIncluded = "1 Core item"
       		$scope.isBasic = true;
       		$scope.tarrif_1to2 = 539;
       		$scope.tarrif_3to9 = 259;
       		$scope.tarrif_10plus = 219;
                  $scope.securityDeposit = 750;
                  $scope.productId = 'TV01';
                  $scope.tarrif_rate = [0,1000,800,733,700,680,667,657,650,644,640,636,633,631,629,627,625,624,623];
       	}

       	if(package == 'value'){
       		//console.log('I am value');
       		$scope.itemsIncluded = "1 Core ";
       		$scope.isValue = true;
       		$scope.tarrif_1to2 = 625;
       		$scope.tarrif_3to9 = 600;
       		$scope.tarrif_10plus = 580;
                  $scope.securityDeposit = 1000;
                  $scope.productId = 'TV02';

       		$scope.tarrif_rate = [0,1200,1000,933,900,880,867,857,850,844,840,836,833,831,829,827,825,824,823];
       	}

       	if(package == 'prime'){
       		//console.log('I am prime');
       		$scope.itemsIncluded = "1 Core ";
       		$scope.isPrime = true;
       		$scope.tarrif_1to2 = 650;
       		$scope.tarrif_3to9 = 630;
       		$scope.tarrif_10plus = 615;
                  $scope.securityDeposit = 1500;
                  $scope.productId = 'TV03';

       	  $scope.tarrif_rate = [0,1650,1450,1383,1350,1330,1317,1307,1300,1294,1290,1286,1283,1281,1279,1277,1275,1274,1273];
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
		   								productName: 'TV',
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
