var fs = require('fs');
var hashFiles = require('hash-files');
var multer  = require('multer');
var Web3= require('web3');
var baseUrl = "/ethereumDapp/";
 

var web3NodeA = new Web3();
web3NodeA.setProvider(new web3NodeA.providers.HttpProvider('http://localhost:8000')); 
var web3NodeB = new Web3();
web3NodeB.setProvider(new web3NodeB.providers.HttpProvider('http://localhost:8001'));
web3NodeA.personal.unlockAccount(web3NodeA.eth.accounts[0],'1234',50000);
web3NodeA.personal.unlockAccount(web3NodeA.eth.accounts[1],'1234',50000);
web3NodeA.personal.unlockAccount(web3NodeA.eth.accounts[2],'1234',50000);
web3NodeB.personal.unlockAccount(web3NodeB.eth.accounts[0],'1234',50000);
web3NodeB.personal.unlockAccount(web3NodeB.eth.accounts[1],'1234',50000);
web3NodeB.personal.unlockAccount(web3NodeB.eth.accounts[2],'1234',50000);
 

//console.log(web3NodeA.isConnected());


var customTransactionLog = function(message,txId,transaction){

	console.log("---- "+ message +" ----");
	console.log("Transactionhash: "+ txId);
	console.log("Transaction Details: ");
	console.log(transaction);
	console.log("-----------------------------");
}

var appRouter = function(app) {
	require('./features/payements.js')(app,web3NodeA,web3NodeB,baseUrl,customTransactionLog);
	require('./features/escrow.js')(app,web3NodeB,baseUrl,customTransactionLog);
	//require('./features/digitizingDocs.js')(app,web3NodeB);
 	//require('./features/letterOfCreditjs')(app,web3NodeB);


app.get("/", function(req, res) {
	
   	 res.send("Hello World");
});


}
module.exports = appRouter;
