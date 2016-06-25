var app = angular.module('dapp.loc.seller', ['ui.router']);
app.controller('sellerCtrl', function($scope,Api) {
$scope.lcStatus=2;
if($scope.lcStatus<=2){
    $scope.message="Waiting for LC to be issued...";
}

else if($scope.lcStatus>=4 && $scope.lcStatus<10){
    $scope.message="Goods Dispatched. Waiting for Payment to be made..";
}

else if($scope.lcStatus==10){
    $scope.message="Amount Received..";
}

$scope.dispatchGoods =function(){
		$scope.digitallySign=true;
        
	}
});
