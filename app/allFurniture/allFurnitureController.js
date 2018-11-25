angular.module('hocketWebsite')
     .controller('allFurnitureController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("allFurnitureController controller is loading");
       $(document).ready(function(){
          $(window).scrollTop(-100);
       });

}]);
