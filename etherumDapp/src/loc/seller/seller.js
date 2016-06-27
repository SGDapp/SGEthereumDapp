var app = angular.module('dapp.loc.seller', ['ui.router']);
app.controller('sellerCtrl', function($scope,Api,$timeout) {
//$scope.lcStatus=10;

Api.letterOfCredit.contractData.get().$promise.then(function(data){
    //console.log(data)
    $scope.contractData=data;
    $timeout(function () {
      $scope.lcStatus=data.lcStatus;
      console.log($scope.lcStatus);

      if($scope.lcStatus<=2){
          $scope.message="Waiting for LC...";
      }

      else if($scope.lcStatus>=4 && $scope.lcStatus<10){
          $scope.message="Goods Dispatched. Waiting for Payment to be made..";
      }

      else if($scope.lcStatus==10){
          $scope.message="Amount Received..";
      }


    }, 1000);



  },function(error) {
      console.log('error', error);
});

Api.letterOfCredit.getAccounts.get().$promise.then(function(data){
    console.log(data);
    $scope.sellerAccountAddress=data[2];
  },function(error) {
                console.log('error', error);
});
Api.letterOfCredit.getAccountBalances.get().$promise.then(function(data){
    console.log(data);
    $scope.sellerAccountBalance=data[2];
  },function(error) {
                console.log('error', error);
});


$scope.dispatchGoods =function(){
		$scope.digitallySign=true;
    Api.letterOfCredit.dispatchGoods.dispatch({sellerAddress: $scope.sellerAccountAddress}).$promise.then(function(data){
        console.log(data)
      },function(error) {
                    console.log('error', error);
    });
	}
});
