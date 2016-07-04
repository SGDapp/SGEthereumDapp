var app = angular.module('dapp.loc.sagent', ['ui.router']);
app.controller('shippingAgentCtrl', function($scope,Api,$timeout) {
$scope.message="";
Api.letterOfCredit.contractData.get().$promise.then(function(data){
    //console.log(data)
    $scope.contractData=data;
    $timeout(function () {
      $scope.lcStatus=data.lcStatus;
      console.log($scope.lcStatus);

      if($scope.lcStatus>6){
          $scope.message="Goods Delivered.";
      }

    }, 1000);



  },function(error) {
      console.log('error', error);
});


Api.letterOfCredit.getAccounts.get().$promise.then(function(data){
    console.log(data);
    $scope.shippingAgentAddress=data[4];
  },function(error) {
                console.log('error', error);
});
Api.letterOfCredit.getAccountBalances.get().$promise.then(function(data){
    console.log(data);
    $scope.shippingAgentBalance=data[4];
  },function(error) {
                console.log('error', error);
});

$scope.goodsDispatched = function(){
    $scope.digitallySign=true;
    Api.letterOfCredit.transportGoods.transport().$promise.then(function(data){
        console.log(data);
      },function(error) {
                    console.log('error', error);
    });
}

$scope.uploadBol = function(){
    $scope.digitallySign=true;
}


$scope.goodsDelivered = function(){
    $scope.digitallySign=true;
    Api.letterOfCredit.goodsDelivered.confirm({shippingAgentAddress: $scope.shippingAgentAddress }).$promise.then(function(data){
        console.log(data);
      },function(error) {
                    console.log('error', error);
    });
}


});
