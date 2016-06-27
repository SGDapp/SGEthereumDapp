var app = angular.module('dapp.loc.buyer', ['ui.router']);
app.controller('buyerCtrl', function($scope,Api,$timeout) {
$scope.contractData={};
$scope.buyerAccountAddress="";
//$scope.lcStatus=0;
	Api.letterOfCredit.contractData.get().$promise.then(function(data){
			//console.log(data)
			$scope.contractData=data;
			$timeout(function () {
        $scope.lcStatus=data.lcStatus;
				console.log($scope.lcStatus);

				if($scope.lcStatus>0 && $scope.lcStatus<7){
					$scope.waitingMessage="Waiting For Goods...";
				}
				else if ($scope.lcStatus>7 && $scope.lcStatus<9){
					$scope.waitingMessage="Waiting For Banks Confirmation To Make Payement...";
				}
				else if($scope.lcStatus==10){
					$scope.waitingMessage="Payement Done";
				}

      }, 1000);



		},function(error) {
				console.log('error', error);
	});

	Api.letterOfCredit.getAccounts.get().$promise.then(function(data){
			console.log(data);
			$scope.buyerAccountAddress=data[0];
		},function(error) {
									console.log('error', error);
	});
	Api.letterOfCredit.getAccountBalances.get().$promise.then(function(data){
			console.log(data);
			$scope.buyerAccountBalance=data[0];
		},function(error) {
									console.log('error', error);
	});

$scope.goodsReceived=false;
	$scope.change= function(){
		$scope.lstatus=$scope.no;
	}
	$scope.requestLC =function(){
		$scope.digitallySign=true;
		Api.letterOfCredit.requestToIssueLC.request().$promise.then(function(data){
				console.log(data)
			},function(error) {
										console.log('error', error);
		});
	}
	$scope.goodsReceived =function(){
		$scope.digitallySign=true;
	}
	$scope.makePayment =function(){
		$scope.digitallySign=true;
	}


});
