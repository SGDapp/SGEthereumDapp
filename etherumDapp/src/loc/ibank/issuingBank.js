var app = angular.module('dapp.loc.ibank', ['ui.router']);
app.controller('issuingBankCtrl', function($scope,Api) {
$scope.lcStatus=5;
$scope.message="";

console.log($scope.issuingBankName);

$scope.createLC = function(){
    $scope.isLcCreated= true;
}


$scope.issueLC = function () {
    $scope.digitallySign=true;
} 

$scope.makePaymentPermission =function(){
    $scope.digitallySign=true;
}

if($scope.lcStatus>1 && $scope.lcStatus<9){
$scope.message="LC issued . Waiting for buyer confirmation on receiving goods..."
}

if($scope.lcStatus>9){
$scope.message="Payment Done"
}

});
