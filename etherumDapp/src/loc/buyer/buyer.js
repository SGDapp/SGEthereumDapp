var app = angular.module('dapp.loc.buyer', ['ui.router']);
app.controller('buyerCtrl', function($scope,Api) {
$scope.popoverMsg="buyer page";
	$("[data-toggle=popover]").popover();
});
