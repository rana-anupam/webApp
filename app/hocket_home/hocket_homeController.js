angular.module('hocketWebsite')
     .controller('hocket_homeController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("hocket_homeController controller is loading");

        $(document).ready(function(){
           $(window).scrollTop(-100);
        });

        $scope.submitForm = function(){
          console.log("I am hit");
          console.log($scope.message);
          
                                    console.log("Hiting the server");
                                    $http.post('hocket_home/query',$scope.message).then(function(response){
                                    UIkit.notification('<div style="font-weight:normal;font-size:0.7em;text-align:center;font-family:Verdana;color:#4caf50">We have received your query. We will get back to you soon.</div>', {status:'success',pos: 'bottom-right'});
                                    $scope.message = "";
                                    })
                                    .catch(function(err){
                                      console.log(err);
                                    });
                              
        }


        // $scope.validateAddressForm = function(){
        //   if($('#message_name').valid() && $('#message_phone').valid() && $('#message_email').valid() && $('#message_text').valid() ){
        //     return true;
        //     console.log("Form is valid");
        //   }else{
        //     return false; 
        //     console.log("Form is invalid");
        //   }
        // }

}]);
