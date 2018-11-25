angular.module('hocketWebsite')
     .controller('homeController', ['$scope','$state','$http', function($scope, $state,$http){
       //console.log("Home controller is loading");
       $(document).ready(function(){
            $(window).scrollTop(-100);
               var val = $('#rangeSlider').val(0);
                       $('#rangeSlider').change(function(){
                               var val = $('#rangeSlider').val();
                                 if(val == 0){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_01.jpg");
                                 }
                                 if(val == 1){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_02.jpg");
                                 }
                                 if(val == 2){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_03.jpg");
                                 }
                                 if(val == 3){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_04.jpg");
                                 }
                                 if(val == 4){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_05.jpg");
                                 }
                                 if(val == 5){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_06.jpg");
                                 }
                                 if(val == 6){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_07.jpg");
                                 }
                                 if(val == 7){
                                    $('#rangeSliderImg').attr("src","public/img/slider/slider1_08.jpg");
                                 }
                           });

       var slider_flag = 0;

       $(document).scroll(function(){
               if ($('#rangeSliderImg').visible()) {
                       if(slider_flag == 0){
                         $.fn.myFunction();
                         slider_flag = 1;
                       }
                   }
               });
                   $.fn.myFunction = function(){
                             console.log("I am visible");
                             $('#rangeSlider').val(1);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_02.jpg");

                               setTimeout(function(){
                               $('#rangeSlider').val(2);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_03.jpg");
                               }, 200);


                               setTimeout(function(){
                               $('#rangeSlider').val(3);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_04.jpg");
                               }, 400);

                               setTimeout(function(){
                               $('#rangeSlider').val(4);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_05.jpg");
                               }, 600);

                               setTimeout(function(){
                               $('#rangeSlider').val(5);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_06.jpg");
                               }, 800);

                               setTimeout(function(){
                               $('#rangeSlider').val(6);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_07.jpg");
                               }, 1000);

                               setTimeout(function(){
                               $('#rangeSlider').val(7);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_08.jpg");
                               }, 1200);

                               setTimeout(function(){
                               $('#rangeSlider').val(6);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_07.jpg");
                               }, 1400);

                               setTimeout(function(){
                               $('#rangeSlider').val(5);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_06.jpg");
                               }, 1600);

                               setTimeout(function(){
                               $('#rangeSlider').val(4);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_05.jpg");
                               }, 2000);

                               setTimeout(function(){
                               $('#rangeSlider').val(5);
                               $('#rangeSliderImg').attr("src","public/img/slider/slider1_06.jpg");
                               }, 2200);
                         }

       });

}]);
