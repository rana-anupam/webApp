angular.module('hocketWebsite')
     .controller('shopController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("shopController controller is loading");
       $(document).ready(function(){
          $(window).scrollTop(-100);
       });

}]);
