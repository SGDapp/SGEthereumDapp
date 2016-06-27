var app = angular.module('dapp.loc.sagent', ['ui.router']);
app.controller('shippingAgentCtrl', function($scope,Api) {
$scope.message=""
$scope.lcStatus=4;
$scope.goodsDispatched = function(){
    $scope.digitallySign=true;
}

$scope.uploadBol = function(){
    $scope.digitallySign=true;
}


$scope.goodsDelivered = function(){
    $scope.digitallySign=true;
}

if($scope.lcStatus>6){
    $scope.message="Goods Delivered."
}

});
