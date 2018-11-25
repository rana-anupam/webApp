angular.module('hocketWebsite')
     .controller('navController', ['$scope','$state','$http','$rootScope', function($scope, $state, $http, $rootScope){

      //console.log("Nav controller is loading");

        $http.get("data/pages")
        .then(function(res) {
            $rootScope.pages = res;
            //console.log("Pages:");
            //console.log($rootScope.pages);
        });

        //console.log("Executing Product");

        $http.get("data/products")
        .then(function(res) {
            $rootScope.products = res;
            //console.log("Products:");
            //console.log($rootScope.products);
        });


		   			$http.post('auth/user')
		   			.then(function(res){
		   				console.log(res.data);
              $scope.user = res.data;
              $('#loader_wrapper').css("display","none");
              
		   			})
		   			.catch(function(err){
		   				console.log(err);
		   			});

          $scope.loginCoverOpen = function(){
            $('#loginCover').css('display','block');
          }

          $scope.loginCoverClose = function(){
            $('#loginCover').css('display','none');
          }

          $scope.logoutUser = function(){
            console.log('I am clicked');
            $(location).attr('href', '/auth/logout')
          }

          $scope.hide_productsDropdown= function(){
            //console.log("hide products drop box");
            $('#productsDropdown').removeClass("uk-open");
          }

          $scope.openCart = function(){
            if(!$scope.user.loggedIn){
              console.log("You are logged out");
              UIkit.notification('<div style="font-weight:normal;font-size:0.75em;text-align:center;font-family:Verdana;color:#f44336">Please Login to access the Cart</div>', {status:'success',pos: 'top-right'})

            }else{
              //console.log("You are logged In");
              $(location).attr('href', '#!/cart')
            }
          }

}]);
