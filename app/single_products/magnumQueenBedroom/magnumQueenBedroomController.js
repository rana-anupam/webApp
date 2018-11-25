angular.module('hocketWebsite')
     .controller('magnumQueenBedroom', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("magnumQueenBedroom controller is loading");

       $(document).ready(function(){
          $(window).scrollTop(-100);

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

       	  $scope.orderTenure = 3;
       	  $scope.orderPackage = 'prime';

       	  $scope.activePackage('prime');
       });

       $scope.activePackage = function(package){
       	$scope.orderPackage = package;
       	var packageCss = '.' + package ;
        $scope.bannerImageSrc = 'app/single_products/magnumQueenBedroom/magnumQueenBedroom_' + package + '.jpg';

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

       	  $scope.tarrif_1 = 101;
       	  $scope.tarrif_2 = 102;
       	  $scope.tarrif_3 = 103;
       	  $scope.tarrif_4 = 104;
       	  $scope.tarrif_5 = 105;
       	  $scope.tarrif_6 = 106;
       	  $scope.tarrif_7 = 107;
       	  $scope.tarrif_8 = 108;
       	  $scope.tarrif_9 = 109;
       	  $scope.tarrif_10 = 110;
       	  $scope.tarrif_11 = 111;
       	  $scope.tarrif_12 = 112;
       	  $scope.tarrif_13 = 113;
       	  $scope.tarrif_14 = 114;
       	  $scope.tarrif_15 = 115;
       	  $scope.tarrif_16 = 116;
       	  $scope.tarrif_17 = 117;
       	  $scope.tarrif_18 = 118;
       	}

       	if(package == 'value'){
       		//console.log('I am value');
       		$scope.itemsIncluded = "1 Core + 2 Addon items"
       		$scope.isValue = true;
       		$scope.tarrif_1to2 = 625;
       		$scope.tarrif_3to9 = 600;
       		$scope.tarrif_10plus = 580;

       		  $scope.tarrif_1 = 201;
	       	  $scope.tarrif_2 = 202;
	       	  $scope.tarrif_3 = 203;
	       	  $scope.tarrif_4 = 204;
	       	  $scope.tarrif_5 = 205;
	       	  $scope.tarrif_6 = 206;
	       	  $scope.tarrif_7 = 207;
	       	  $scope.tarrif_8 = 208;
	       	  $scope.tarrif_9 = 209;
	       	  $scope.tarrif_10 = 210;
	       	  $scope.tarrif_11 = 211;
	       	  $scope.tarrif_12 = 212;
	       	  $scope.tarrif_13 = 213;
	       	  $scope.tarrif_14 = 214;
	       	  $scope.tarrif_15 = 215;
	       	  $scope.tarrif_16 = 216;
	       	  $scope.tarrif_17 = 217;
	       	  $scope.tarrif_18 = 218;
       	}

       	if(package == 'prime'){
       		//console.log('I am prime');
       		$scope.itemsIncluded = "2 Core + 3 Addon items"
       		$scope.isPrime = true;
       		$scope.tarrif_1to2 = 650;
       		$scope.tarrif_3to9 = 630;
       		$scope.tarrif_10plus = 615;

       	  $scope.tarrif_1 = 301;
       	  $scope.tarrif_2 = 302;
       	  $scope.tarrif_3 = 303;
       	  $scope.tarrif_4 = 304;
       	  $scope.tarrif_5 = 305;
       	  $scope.tarrif_6 = 306;
       	  $scope.tarrif_7 = 307;
       	  $scope.tarrif_8 = 308;
       	  $scope.tarrif_9 = 309;
       	  $scope.tarrif_10 = 310;
       	  $scope.tarrif_11 = 311;
       	  $scope.tarrif_12 = 312;
       	  $scope.tarrif_13 = 313;
       	  $scope.tarrif_14 = 314;
       	  $scope.tarrif_15 = 315;
       	  $scope.tarrif_16 = 316;
       	  $scope.tarrif_17 = 317;
       	  $scope.tarrif_18 = 318;
       	}  		
       	$scope.activeTenure($scope.tarrif_3,'3');
            		
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


       $scope.submitOrder = function(){
       	var time = moment().add({hours:5,minutes:30}).format('MMMM Do YYYY , h:mm:ss a');
       		if($scope.user.loggedIn){
       			console.log("Add to the Cart");
       			var request = {			userId : $scope.user.id,
		   								tenure: $scope.orderTenure,
		   								tarrif: $scope.orderTarrif,
		   								quantity:1,
		   								package: $scope.orderPackage,
		   								addon: false,
		   								productId: '1800',
		   								productName: 'Magnum Queen Bedroom',
		   								productImage: $scope.bannerImageSrc,
		   								itemsIncluded: $scope.itemsIncluded,
		   								deposit: '500',
                                                            status:'Order Placed',
		   								date: time
		   							};
		   			$http.post('api/cart/addProduct', request).then(function(){
		   				console.log("successfully added to the cart");
		   				UIkit.notification('<div style="font-weight:normal;font-size:0.75em;text-align:center;font-family:Verdana;color:#4caf50">Successfully added to the cart</div>', {status:'success',pos: 'top-right'})
		   			}).catch(function(err){
		   				console.log(err);
		   			});

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
