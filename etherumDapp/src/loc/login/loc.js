var app = angular.module('dapp.loc', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
	.state('loc', {
            url: '/loc',
 	    abstract: true,
	    template: '<ui-view/>'
         })
	.state('loc.login', {
            url: '/login',
            templateUrl: './src/loc/login/loc.html' ,
	    controller: 'locCtrl'
         })
	.state('loc.buyer', {
            url: '/buyer',
            templateUrl: './src/loc/buyer/buyer.html' ,
	    controller: 'buyerCtrl'
         })
	.state('loc.seller', {
            url: '/seller',
            templateUrl: './src/loc/seller/seller.html' ,
	    controller: 'sellerCtrl'
         })
	.state('loc.abank', {
            url: '/advisingBank',
            templateUrl: './src/loc/abank/advisingBank.html' ,
	    controller: 'advisingBankCtrl'
         })
	.state('loc.ibank', {
            url: '/issuingBank',
            templateUrl: './src/loc/ibank/issuingBank.html' ,
	    controller: 'issuingBankCtrl'
         })
	.state('loc.sagent', {
            url: '/shippingAgent',
            templateUrl: './src/loc/sagent/shippingAgent.html' ,
	    controller: 'shippingAgentCtrl'
         });

});

app.controller('locCtrl', function($scope,Api,$state) {

var users ={buyer:"buyer", seller:"seller", advisingBank:"Abank" , IssuingBank:"Ibank", shippingAgent:'sagent'};

function fadeOut(){
	$('form').fadeOut(500);
	$('.wrapper').addClass('form-success');

}
$scope.login =function(){
	console.log($scope.username);
	console.log($scope.password);



	if($scope.username==users.buyer){
		fadeOut();
		window.setTimeout(function() {
            		$state.go('loc.buyer');
        	}, 2000);

	}
	else if($scope.username==users.seller){
	fadeOut();
	}
	else if($scope.username==users.advisingBank){
	fadeOut();
	}
	else if($scope.username==users.IssuingBank){
	fadeOut();
	}
	else if($scope.username==users.shippingAgent){
	fadeOut();
	}
	else {
		toastr.warning('Invalid Username Or Password');
	}
}

});
app.directive('locStatus', function() {
  return {
    restrict: 'E',
    scope: {
      activeCircleNo: '=currentStatus'
    },
    link: function (scope, el, attrs) {
            $("[data-toggle=popover]").popover();

    },
    templateUrl: '/src/loc/directive-templates/loc-status-directive.html'
  };
});
