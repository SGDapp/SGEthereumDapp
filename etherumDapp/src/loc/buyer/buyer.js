var app = angular.module('dapp.loc.buyer', ['ui.router']);
app.controller('buyerCtrl', function($scope,Api) {

	$scope.change= function(){
		$scope.lstatus=$scope.no;

	}

});
