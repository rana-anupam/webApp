angular.module('hocketWebsite')
     .controller('contactUsController', ['$scope','$state','$http', function($scope, $state,$http){
       console.log("Contact Us controller is loading");

        $(document).ready(function(){
           $(window).scrollTop(-100);
        });



        $scope.submitForm = function(){
          if ($scope.validateAddressForm()){
                                    console.log("Hiting the server");
                                    $http.post('api/contact/message',$scope.message).then(function(response){
                                    UIkit.notification('<div style="font-weight:normal;font-size:0.7em;text-align:center;font-family:Verdana;color:#4caf50">Your message has been received. We will get back to you soon.</div>', {status:'success',pos: 'bottom-right'});
                                    $scope.message.name = "";
                                    $scope.message.phone = "";
                                    $scope.message.email = "";
                                    $scope.message.text = "";
      														  })
        														.catch(function(err){
        															console.log(err);
        														});
                              }
                              else{
                                    UIkit.notification('<div style="font-weight:normal;font-size:0.7em;text-align:center;font-family:Verdana;color:#f44336">Please enter vaild form details</div>', {status:'success',pos: 'bottom-right'});
                              }
        }


        $scope.validateAddressForm = function(){
          if($('#message_name').valid() && $('#message_phone').valid() && $('#message_email').valid() && $('#message_text').valid() ){
            return true;
            console.log("Form is valid");
          }else{
            return false; 
            console.log("Form is invalid");
          }
        }

}]);

