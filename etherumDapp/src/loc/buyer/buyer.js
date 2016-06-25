var app = angular.module('dapp.loc.buyer', ['ui.router']);
app.controller('buyerCtrl', function($scope,Api) {
$scope.lcStatus=0;
$scope.goodsReceived=false;
	$scope.change= function(){
		$scope.lstatus=$scope.no;

	}
	$scope.requestLC =function(){
		$scope.digitallySign=true;
	}
	$scope.goodsReceived =function(){
		$scope.digitallySign=true;
	}
	$scope.makePayment =function(){
		$scope.digitallySign=true;
	}

});
