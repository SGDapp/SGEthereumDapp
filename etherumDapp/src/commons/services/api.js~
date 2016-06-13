var app = angular.module('dapp.apiService', []);

app.factory('Api',  function($resource) {
  var baseUrl="/ethereumDapp/";
  return {
	
	//users : ['John', 'James', 'Jake'] 
	payements: {
		getNodeAAccounts: $resource(baseUrl+'payements/getNodeAAccounts',{},{get:{method:'GET',isArray: true }}),
		getNodeBAccounts: $resource(baseUrl+'payements/getNodeBAccounts',{},{get:{method:'GET',isArray: true }}),
		getNodeABalances: $resource(baseUrl+'payements/getNodeABalances',{},{get:{method:'GET',isArray: true }}),
		getNodeBBalances: $resource(baseUrl+'payements/getNodeBBalances',{},{get:{method:'GET',isArray: true }}),
		addAssetsToMaster: $resource(baseUrl+'payements/addAssetsToMaster',{},{add:{method:'GET',params:{assetValue:'@assetValue'}}}),
		transferAssetsFromMaster: $resource(baseUrl+'payements/transferAssetsFromMaster',{},{transfer:{method:'GET',params:{payementsTo:'@payementsTo',assetValue:'@assetValue'}}}),
		transferAssetsBetweenClients: $resource(baseUrl+'payements/transferAssetsBetweenClients',{},{transfer: {method:'GET',params:{ payementsFrom:'@payementsFrom',payementsTo:'@payementsTo',assetValue:'@assetValue'}}})
		
	}

   }

});
