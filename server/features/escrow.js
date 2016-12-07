var contractDefinitions = require("../contracts/build/classes.json");
require('dotenv').config();
var escrow = function(app,web3NodeB,baseUrl,customTransactionLog) {

var ABI=JSON.parse(contractDefinitions.multisign.interface);
var Address=process.env.Escrow_Credit_Contract_Address;
// have to change logic to dynamically store and fetch contract mined address from database
var multisign = web3NodeB.eth.contract(ABI).at(Address);

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

app.get(baseUrl+"escrow/setOwners", function(req, res) {

	var txId = multisign.setOwners(web3NodeB.eth.accounts[0],web3NodeB.eth.accounts[1],web3NodeB.eth.accounts[2],{from:web3NodeB.eth.accounts[0]}); // clearing existing data
	var transaction = web3NodeB.eth.getTransaction(txId);
	customTransactionLog("set Owners",txId,transaction);
	res.send(txId);
});

app.get(baseUrl+"escrow/setRequired", function(req, res) {

	var txId = multisign.setRequired(req.query.required,req.query.assetValue,{from:	web3NodeB.eth.accounts[0]});
	var transaction = web3NodeB.eth.getTransaction(txId);
	customTransactionLog("set Required",txId,transaction);
	res.send(txId);
});

app.get(baseUrl+"escrow/contractData", function(req, res) {

	var ownersAccepted=[];
	var contractAddress=multisign.address;
	var yetNeeded=multisign.yetNeeded();
	var owner1=multisign.owners();
	var owner2=multisign.owners(1);
	var owner3=multisign.owners(2);
	var fromAddress=multisign.from();
	var toAddress=multisign.to();
	var yetNeeded=multisign.yetNeeded();
	var contractBalance= web3NodeB.fromWei(web3NodeB.eth.getBalance(multisign.address), "ether");
	var assetValue= web3NodeB.fromWei(multisign.assetValue(),"ether");
	ownersAccepted[0]=multisign.accepted(web3NodeB.eth.accounts[0]);
	ownersAccepted[1]=multisign.accepted(web3NodeB.eth.accounts[1]);
	ownersAccepted[2]=multisign.accepted(web3NodeB.eth.accounts[2]);

	var contractData ={
		ownersAccepted:ownersAccepted,
		contractAddress:contractAddress,
		yetNeeded: yetNeeded,
		owner1:owner1,
		owner2:owner2,
		owner3:owner3,
		fromAddress: fromAddress,
		toAddress:toAddress,
		yetNeeded: yetNeeded,
		contractBalance: contractBalance,
		assetValue: assetValue
	}
	res.send(contractData);
});

app.get(baseUrl+"escrow/clearAccepted", function(req, res) {

	var txId = multisign.clearAccepted({from:web3NodeB.eth.accounts[0]}); // clearing existing data
	var transaction = web3NodeB.eth.getTransaction(txId);
	customTransactionLog("Clear Accepted Array",txId,transaction);
	res.send(txId);
});

app.get(baseUrl+"escrow/transferAssets", function(req, res) {


	var txId=multisign.sendAsset(req.query.transferTo,{from: req.query.transferFrom,value: web3NodeB.toWei(req.query.assetValue, 'ether')});
	var transaction = web3NodeB.eth.getTransaction(txId);
	customTransactionLog("Transfer Assets from Seller to contract",txId,transaction);
	res.send(txId);
});

app.get(baseUrl+"escrow/accept", function(req, res) {


	var txId = multisign.approve(req.query.accepter, {from: web3NodeB.eth.accounts[0]});
	var transaction = web3NodeB.eth.getTransaction(txId);
	customTransactionLog("Transfer Assets from Seller to contract",txId,transaction);
	res.send(txId);
});



}

module.exports = escrow;
