angular.module('hocketWebsite')
     .controller('aboutUsController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("aboutUs controller is loading");
       $(document).ready(function(){
          $(window).scrollTop(-100);
       });

}]);
