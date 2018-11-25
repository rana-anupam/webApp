angular.module('hocketWebsite')
     .controller('privacyPolicyController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("TnC controller is loading");

        $(document).ready(function(){
           $(window).scrollTop(-100);
        });

}]);
