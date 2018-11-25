angular.module('hocketWebsite')
     .controller('productsController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("Combos controller is loading");
       $(document).ready(function(){
          $(window).scrollTop(-100);
       });

}]);
