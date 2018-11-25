var app =  angular.module('hocketWebsite', ['ui.router', 'ngFileUpload','ngRoute']);
		   app.config(function($stateProvider, $urlRouterProvider){
 
		 	 	$urlRouterProvider.otherwise('/');

		   		$stateProvider
		   			.state('appliances',{
		   				url : "/appliances/:id",
		   				templateUrl : "app/appliances/appliances.html",
		   				controller : "appliancesController"
		   			})

		   			.state('beds',{
		   				url : "/beds/:id",
		   				templateUrl : "app/beds/beds.html",
		   				controller : "bedsController"
		   			})

		   			.state('furniture',{
		   				url : "/furniture/:id",
		   				templateUrl : "app/furniture/furniture.html",
		   				controller : "furnitureController"
		   			})

		   			.state('home',{
		   				url : "/",
		   				templateUrl : "app/home/home.html",
		   				controller : "homeController"
		   			})
						.state('products',{
		   				url : "/products",
		   				templateUrl : "app/all_products/products.html",
		   				controller : "productsController"
		   			})
						.state('allFurniture',{
		   				url : "/allFurniture",
		   				templateUrl : "app/allFurniture/allFurniture.html",
		   				controller : "allFurnitureController"
		   			})
						.state('allAppliances',{
		   				url : "/allAppliances",
		   				templateUrl : "app/allAppliances/allAppliances.html",
		   				controller : "allappliancesController"
		   			})
						.state('hocket_home',{
		   				url : "/hocket_home",
		   				templateUrl : "app/hocket_home/hocket_home.html",
		   				controller : "hocket_homeController"
		   			})
						.state('combos',{
		   				url : "/combos",
		   				templateUrl : "app/combos/combos.html",
		   				controller : "combosController"
		   			})
						.state('faq',{
		   				url : "/faq",
		   				templateUrl : "app/faq/faq.html",
							controller : "faqController"
		   			})
						.state('tc',{
		   				url : "/tc",
		   				templateUrl : "app/tc/tc.html",
							controller : "tcController"
		   			})
						.state('privacyPolicy',{
		   				url : "/privacyPolicy",
		   				templateUrl : "app/privacyPolicy/privacyPolicy.html",
							controller : "privacyPolicyController"
		   			})
						.state('aboutUs',{
		   				url : "/aboutUs",
		   				templateUrl : "app/aboutUs/aboutUs.html",
							controller : "aboutUsController"
		   			})
						.state('contactUs',{
		   				url : "/contactUs",
		   				templateUrl : "app/contactUs/contactUs.html",
							controller : "contactUsController"
		   			})
						.state('cart',{
		   				url : "/cart",
		   				templateUrl : "app/cart/cart.html",
							controller : "cartController"
		   			})
						.state('dashboard',{
		   				url : "/dashboard",
		   				templateUrl : "app/dashboard/dashboard.html",
							controller : "dashboardController"
		   			})
						.state('offers_tnc',{
		   				url : "/offers_tnc",
		   				templateUrl : "app/offers_tnc/offers_tnc.html",
							controller : "offers_tncController"
		   			});


		   });
