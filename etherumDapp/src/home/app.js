var angular= require('angular');
var web3= require('web3');
var hashFiles = require('hash-files');
var fs= require('fs');
require('angular-ui-router');
require('ng-upload');
require('angular-resource');
require('../contracts/contracts.js');
require('../loc/login/loc.js');
require('../loc/buyer/buyer.js');
require('../loc/seller/seller.js');
require('../loc/abank/advisingBank.js');
require('../loc/ibank/issuingBank.js');
require('../loc/sagent/shippingAgent.js');
require('../commons/services/api.js');
var app = angular.module('dapp', ['ui.router','ngResource','dapp.apiService','ngUpload','dapp.contracts','dapp.loc','dapp.loc.buyer','dapp.loc.seller','dapp.loc.abank','dapp.loc.ibank','dapp.loc.sagent']);


var lcCtrl=require('../lc/lc');
var ddCtrl=require('../dd/dd');




app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
	console.log("success");
        })
        .error(function(){
		console.log("error");
        });
    }
}]);

app.controller('lcCtrl', ['$scope','$http','fileUpload', lcCtrl]);
app.controller('ddCtrl', ['$scope','fileUpload', ddCtrl]);
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/wallet');

    $stateProvider

        // WALLET PAGE
        .state('wallet', {
            url: '/wallet',
            templateUrl: './src/wallet/wallet.html'
        })

        // Multisign PAGE
        .state('multisign', {
            url: '/multisign',
            templateUrl: './src/multisign/multisign.html' ,
	    controller: 'multisignCtrl'
         })
        .state('dd', {
            url: '/dd',
            templateUrl: './src/dd/dd.html' ,
	    controller: 'ddCtrl'
         })
	 .state('lc', {
            url: '/lc',
            templateUrl: './src/lc/lc.html' ,
	    controller: 'lcCtrl'
         })
	.state('contracts', {
            url: '/contracts',
            templateUrl: './src/contracts/contracts.html' ,
	    controller: 'ContractsCtrl'
         })


});

app.controller('homeCtrl', function($scope,$timeout,$http,Api) {

$scope.isAlert=true;

// get NodeA Accounts
Api.payements.getNodeAAccounts.get().$promise.then(function(data){
		//console.log(data)
		$scope.nodeA_Accounts = data;
	},function(error) {
                console.log('error', error);
});

//get NodeB Accounts
Api.payements.getNodeBAccounts.get().$promise.then(function(data){
		//console.log(data)data;
    var accounts =[];
    accounts[0]= data[0];
    accounts[1]= data[1];
    accounts[2]= data[2];
		$scope.nodeB_Accounts = accounts;
	},function(error) {
                console.log('error', error);
});

//get NodeA Balances
Api.payements.getNodeABalances.get().$promise.then(function(data){
		//console.log(data)
		$scope.nodeA_Balances = data;
	},function(error) {
                console.log('error', error);
});

//get NodeB Balances
Api.payements.getNodeBBalances.get().$promise.then(function(data){
		//console.log(data)
		$scope.nodeB_Balances = data;
	},function(error) {
                console.log('error', error);
});


/*$http.get("/ethereumDapp/payements/getNodeAAccounts")
        .success(function(data){
		$scope.nodeA_Accounts=data;
        })
        .error(function(){
		console.log("error");
        });

*/




// Add asset to Master Wallet
$scope.addAsset = function(){
Api.payements.addAssetsToMaster.add({assetValue:$scope.assetValue}).$promise.then(function(data){
		console.log(data);
	},function(error) {
                console.log('error', error);
});

}

//Transfer Asset from from Master Wallet to a wallet
$scope.transferAsset = function(){
Api.payements.transferAssetsFromMaster.transfer({payementsTo:$scope.walletTo,assetValue:$scope.masterAssetValue}).$promise.then(function(data){
		console.log(data);
	},function(error) {
                console.log('error', error);
});
}

// Transfer assets between wallets
$scope.transfer =function(){

Api.payements.transferAssetsBetweenClients.transfer({ payementsFrom:$scope.from,payementsTo:$scope.to,assetValue:$scope.value}).$promise.then(function(data){
		console.log(data);
	},function(error) {
                console.log('error', error);
});

}



});

app.controller('multisignCtrl', function($scope,Api) {

$scope.isAlert=true;
$scope.buttonVisibility=false;

$scope.nodeB_Accounts=[];
Api.payements.getNodeBAccounts.get().$promise.then(function(data){
		//console.log(data)
    var accounts =[];
    accounts[0]= data[0];
    accounts[1]= data[1];
    accounts[2]= data[2];
    $scope.nodeB_Accounts = accounts;
	},function(error) {
                console.log('error', error);
});

$scope.nodeB_Balances=[];
//get NodeB Balances
Api.payements.getNodeBBalances.get().$promise.then(function(data){
		//console.log(data)
		$scope.nodeB_Balances = data;
    console.log($scope.nodeB_Balances);
	},function(error) {
                console.log('error', error);
});


$scope.senderBalance= $scope.nodeB_Balances[0];

Api.escrow.contractData.get().$promise.then(function(data){
		//console.log(data)
    //console.log(data);
    setContractData(data);
	},function(error) {
                console.log('error', error);
});

function setContractData(data){
  $scope.ownersAccepted=data.ownersAccepted;
  $scope.contractAddress=data.contractAddress;
  $scope.yetNeeded=data.yetNeeded;
  $scope.owner1=data.owner1;
  $scope.owner2=data.owner2;
  $scope.owner3=data.owner3;
  $scope.fromAddress=data.fromAddress;
  $scope.toAddress=data.toAddress;
  $scope.yetNeeded=data.yetNeeded;
  $scope.contractBalance= data.contractBalance;
  $scope.assetValue= data.assetValue;
  //console.log($scope.yetNeeded);
  //console.log($scope.buttonVisibility);
  if($scope.yetNeeded!="0"){
  $scope.buttonVisibility=true;
  }
  console.log($scope.owner1);
  if($scope.owner1==0)
  {
  //console.log("akdshgf");setOwners
    //multisign.setOwners(web3NodeB.eth.accounts[0],web3NodeB.eth.accounts[1],web3NodeB.eth.accounts[2],{from:web3NodeB.eth.accounts[0]});
    Api.escrow.setOwners.get().$promise.then(function(data){
    		//console.log(data)
        console.log(data);
    	},function(error) {
                    console.log('error', error);
    });

  }
}

$scope.needed = {
  name:"1"
};



$scope.transfer =function(){

console.log($scope.from);
  Api.escrow.clearAccepted.get().$promise.then(function(data){
      //console.log(data)
      console.log(data);
    },function(error) {
                  console.log('error', error);
  });
  Api.escrow.transferAssets.get({transferTo:$scope.to,transferFrom:$scope.from,assetValue:$scope.value}).$promise.then(function(data){
      //console.log(data)
      console.log(data);
    },function(error) {
                  console.log('error', error);
  });
  Api.escrow.setRequired.set({required:$scope.needed.name,assetValue:$scope.value}).$promise.then(function(data){
      //console.log(data)
      console.log(data);
    },function(error) {
                  console.log('error', error);
  });

}

$scope.accept= function(index){
  Api.escrow.accept.get({accepter:$scope.nodeB_Accounts[index]}).$promise.then(function(data){
      //console.log(data)
      console.log(data);
    },function(error) {
                  console.log('error', error);
  });
$scope.ownersAccepted[index]=true;
}



});
