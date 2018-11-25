angular.module('hocketWebsite')
     .controller('faqController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("FAQ controller is loading");

        $(document).ready(function(){
           $(window).scrollTop(-100);
        });

}]);
