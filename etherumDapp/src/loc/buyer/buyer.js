var app = angular.module('dapp.loc.buyer', ['ui.router']);
app.controller('buyerCtrl', function($scope,Api) {
$scope.lcStatus=10;
if($scope.lcStatus>0 && $scope.lcStatus<7){
	$scope.waitingMessage="Waiting For Goods...";
}
else if ($scope.lcStatus>7 && $scope.lcStatus<9){
	$scope.waitingMessage="Waiting For Banks Confirmation To Make Payement...";
}
else{
	$scope.waitingMessage="Payement Done";
}
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
