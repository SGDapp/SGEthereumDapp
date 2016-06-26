var app = angular.module('dapp.loc.abank', ['ui.router']);
app.controller('advisingBankCtrl', function($scope,Api) {
$scope.lcStatus=10

$scope.verifyLC= function(){
    $scope.digitallySign=true;
}

if($scope.lcStatus>1 && $scope.lcStatus<=9){
$scope.message="LC Verified.Waiting for payment to be made..."
}
else if($scope.lcStatus==10){
$scope.message="Payment Made."
}

});
