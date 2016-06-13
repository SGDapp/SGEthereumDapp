var angular= require('angular');
var web3= require('web3');
var hashFiles = require('hash-files');
var fs= require('fs');
require('angular-ui-router');
require('ng-upload');
require('angular-resource');
require('../contracts/contracts.js');
require('../commons/services/api.js');
var app = angular.module('dapp', ['ui.router','ngResource','dapp.apiService','ngUpload','dapp.contracts']);


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
         });
        
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
		//console.log(data)
		$scope.nodeB_Accounts = data;
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

app.controller('multisignCtrl', function($scope) {

$scope.isAlert=true;
var web3NodeB = new Web3();
web3NodeB.setProvider(new web3NodeB.providers.HttpProvider('http://localhost:8001')); 
$scope.nodeB_Accounts=web3NodeB.eth.accounts;

var nodeBbalances=[];
for(var i=0;i<$scope.nodeB_Accounts.length;i++){
	nodeBbalances[i]=web3NodeB.fromWei(web3NodeB.eth.getBalance($scope.nodeB_Accounts[i]), "ether");
	
}
web3NodeB.personal.unlockAccount(web3NodeB.eth.accounts[0],'1234');
web3NodeB.personal.unlockAccount(web3NodeB.eth.accounts[1],'1234');
web3NodeB.personal.unlockAccount(web3NodeB.eth.accounts[2],'1234');

$scope.nodeB_Balances=nodeBbalances;
$scope.senderBalance= $scope.nodeB_Balances[0];

var ABI=[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owners","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_owner1","type":"address"},{"name":"_owner2","type":"address"},{"name":"_owner3","type":"address"}],"name":"setOwners","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"to","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"accepted","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"clearAccepted","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"clearContract","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"}],"name":"sendAsset","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_required","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"setRequired","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"assetValue","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"yetNeeded","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"from","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_accepter","type":"address"}],"name":"approve","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"str","type":"string"}],"name":"customLog","type":"event"}];
var Address="0x89b3c3f8c6a4804e4cf3e43cca68cd512120d185";
var multisign = web3NodeB.eth.contract(ABI).at(Address);

$scope.ownersAccepted=[];
$scope.buttonVisibility=false;
$scope.contractAddress=multisign.address;
$scope.yetNeeded=multisign.yetNeeded();
$scope.owner1=multisign.owners();
$scope.owner2=multisign.owners(1);
$scope.owner3=multisign.owners(2);

if($scope.owner1==0)
{
//console.log("akdshgf");
multisign.setOwners(web3NodeB.eth.accounts[0],web3NodeB.eth.accounts[1],web3NodeB.eth.accounts[2],{from:web3NodeB.eth.accounts[0]});
}


$scope.ownersAccepted[0]=multisign.accepted($scope.nodeB_Accounts[0]);
$scope.ownersAccepted[1]=multisign.accepted($scope.nodeB_Accounts[1]);
$scope.ownersAccepted[2]=multisign.accepted($scope.nodeB_Accounts[2]);
$scope.fromAddress=multisign.from();
$scope.toAddress=multisign.to();
$scope.yetNeeded=multisign.yetNeeded();
$scope.contractBalance= web3NodeB.fromWei(web3NodeB.eth.getBalance(multisign.address), "ether");
$scope.assetValue= web3NodeB.fromWei(multisign.assetValue(),"ether")
$scope.needed = {
  name:"1"
};
if($scope.yetNeeded!="0"){
$scope.buttonVisibility=true;
}

$scope.transfer =function(){

console.log($scope.from);
multisign.clearAccepted({from:web3NodeB.eth.accounts[0]});
var txId=multisign.sendAsset($scope.to,{from: $scope.from,value: web3NodeB.toWei($scope.value, 'ether')});
$scope.transaction = web3NodeB.eth.getTransaction(txId);
multisign.setRequired($scope.needed.name,$scope.value,{from: $scope.from});
}

$scope.accept= function(index){
console.log(index + ":" + $scope.nodeB_Accounts[index]);

var txId=multisign.approve($scope.nodeB_Accounts[index], {from: web3NodeB.eth.accounts[0]});
$scope.transaction = web3NodeB.eth.getTransaction(txId);
$scope.ownersAccepted[index]=true;
}
var event = multisign.customLog();

// watch for changes
event.watch(function(error, result){
    // result will contain various information
    // including the argumets given to the Deposit
    // call.
    if (!error)
        {
		console.log(result.args.str);
	}
});


});
