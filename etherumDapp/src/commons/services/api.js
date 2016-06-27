var app = angular.module('dapp.apiService', []);

app.factory('Api',  function($resource) {
  var baseUrl="/ethereumDapp/";
  return {

   payements: {
  		getNodeAAccounts: $resource(baseUrl+'payements/getNodeAAccounts',{},{get:{method:'GET',isArray: true }}),
  		getNodeBAccounts: $resource(baseUrl+'payements/getNodeBAccounts',{},{get:{method:'GET',isArray: true }}),
  		getNodeABalances: $resource(baseUrl+'payements/getNodeABalances',{},{get:{method:'GET',isArray: true }}),
  		getNodeBBalances: $resource(baseUrl+'payements/getNodeBBalances',{},{get:{method:'GET',isArray: true }}),
  		addAssetsToMaster: $resource(baseUrl+'payements/addAssetsToMaster',{},{add:{method:'GET',params:{assetValue:'@assetValue'}}}),
  		transferAssetsFromMaster: $resource(baseUrl+'payements/transferAssetsFromMaster',{},{transfer:{method:'GET',params:{payementsTo:'@payementsTo',assetValue:'@assetValue'}}}),
  		transferAssetsBetweenClients: $resource(baseUrl+'payements/transferAssetsBetweenClients',{},{transfer: {method:'GET',params:{ payementsFrom:'@payementsFrom',payementsTo:'@payementsTo',assetValue:'@assetValue'}}})

  	},
    escrow: {
      setOwners: $resource(baseUrl+'escrow/setOwners',{},{get:{method:'GET' }}),
      setRequired: $resource(baseUrl+'escrow/setRequired',{},{set:{method:'GET',params:{required:'@required',assetValue:'@assetValue'} }}),
      clearAccepted: $resource(baseUrl+'escrow/clearAccepted',{},{clear:{method:'GET' }}),
      transferAssets: $resource(baseUrl+'escrow/transferAssets',{},{transfer:{method:'GET',params:{transferTo:'@transferTo',transferFrom:'@transferFrom',assetValue:'@assetValue'}}}),
      accept: $resource(baseUrl+'escrow/accept',{},{get:{method:'GET',params:{accepter:'@accepter'}}}),
      contractData: $resource(baseUrl+'escrow/contractData',{},{get:{method:'GET' }}),
    },
    letterOfCredit:{
      getAccounts: $resource(baseUrl+'letterOfCredit/getAccounts',{},{get:{method:'GET',isArray: true }}),
      getAccountBalances: $resource(baseUrl+'letterOfCredit/getAccountBalances',{},{get:{method:'GET',isArray: true }}),
      contractData: $resource(baseUrl+'letterOfCredit/getContractData',{},{get:{method:'GET' }}),
      requestToIssueLC: $resource(baseUrl+'letterOfCredit/requestToIssueLC',{},{request:{method:'GET' }}),
      verifyLC: $resource(baseUrl+'letterOfCredit/verifyLC',{},{verify:{method:'GET' }}),
      dispatchGoods: $resource(baseUrl+'letterOfCredit/dispatchGoods',{},{dispatch:{method:'GET' }}),

    }

  }

});
