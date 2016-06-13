var payements = function(app,web3NodeA,web3NodeB) {

var nodeA_Accounts = web3NodeA.eth.accounts;
var nodeAbalances = [];
var nodeB_Accounts = web3NodeB.eth.accounts;
var nodeBbalances=[];

app.get("/ethereumDapp/payements/getNodeAAccounts", function(req, res) {
	
	res.send(nodeA_Accounts);
});
app.get("/ethereumDapp/payements/getNodeBAccounts", function(req, res) {
	
	res.send(nodeB_Accounts);
});

app.get("/ethereumDapp/payements/getNodeABalances", function(req, res) {
	
	for(var i=0;i<nodeA_Accounts.length;i++){
		nodeAbalances[i]=web3NodeA.fromWei(web3NodeA.eth.getBalance(nodeA_Accounts[i]), "ether");
	}

	res.send(nodeAbalances);
});
app.get("/ethereumDapp/payements/getNodeBBalances", function(req, res) {
	
	for(var i=0;i<nodeB_Accounts.length;i++){
		nodeBbalances[i]=web3NodeB.fromWei(web3NodeB.eth.getBalance(nodeB_Accounts[i]), "ether");
	}

	res.send(nodeBbalances);
});

app.get("/ethereumDapp/payements/addAssetsToMaster", function(req, res) {
	
	console.log(req);
	console.log(req.params.assetValue);
	var txId=web3NodeA.eth.sendTransaction({from: web3NodeA.eth.accounts[0], to: web3NodeA.eth.accounts[2], value: web3NodeA.toWei(req.query.assetValue, 'ether')});
	var transaction = web3NodeA.eth.getTransaction(txId);
	console.log("---- Add Asset To Master ----");
	console.log("Transactionhash: "+ txId);
	console.log("Transaction Details: ");
	console.log(transaction);
	console.log("-----------------------------");
	res.send(txId);
});

app.get("/ethereumDapp/payements/transferAssetsFromMaster", function(req, res) {
	/*console.log(req.query.payementsTo);
	console.log(req.query.assetValue);
	console.log(req);*/

	var txId=web3NodeA.eth.sendTransaction({from: web3NodeA.eth.accounts[2], to: req.query.payementsTo, value: web3NodeA.toWei(req.query.assetValue, 'ether')});
	var transaction = web3NodeA.eth.getTransaction(txId);
	console.log("---- Transfer Assets From Master TO A Client ----");
	console.log("Transactionhash: "+ txId);
	console.log("Transaction Details: ");
	console.log(transaction);
	console.log("-------------------------------------------------");
	res.send(txId);
});

app.get("/ethereumDapp/payements/transferAssetsBetweenClients", function(req, res) {
	var txId=web3NodeB.eth.sendTransaction({from:req.query.payementsFrom, to:req.query.payementsTo, value: web3NodeB.toWei(req.query.assetValue, 'ether')});
	var transaction = web3NodeB.eth.getTransaction(txId);
	console.log("---- Transfer Assets Between Clients ----");
	console.log("Transactionhash: "+ txId);
	console.log("Transaction Details: ");
	console.log(transaction);
	console.log("-----------------------------------------");
	res.send(txId);
});




}
module.exports = payements;
