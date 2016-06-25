var app = angular.module('dapp.loc.buyer', ['ui.router']);
app.controller('buyerCtrl', function($scope,Api) {
$scope.lstatus=3;
	$scope.change= function(){
		$scope.lstatus=$scope.no;

	}

});
