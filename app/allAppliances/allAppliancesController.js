angular.module('hocketWebsite')
     .controller('allappliancesController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("Appliacces controller is loading");
       $(document).ready(function(){
          $(window).scrollTop(-100);
       });

}]);
