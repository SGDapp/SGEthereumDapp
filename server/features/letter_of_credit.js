var contractDefinitions = require("../contracts/build/classes.json");
require('dotenv').config();
var letterOfCredit = function(app,web3NodeB,baseUrl,multer,hashFiles,fs,customTransactionLog) {

  var ABI=JSON.parse(contractDefinitions.LetterOfCredit.interface);
  var Address=process.env.Letter_Of_Credit_Contract_Address;
  // have to change logic to dynamically store and fetch contract mined address from database
  var LOC = web3NodeB.eth.contract(ABI).at(Address);

  var event = LOC.CustomLog();

  var nodeB_Accounts = web3NodeB.eth.accounts;
  var nodeBbalances=[];
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

  var upload = multer({dest:'./uploads/'});
  var pdfUpload = upload.single('pdfFile');
  var bolUpload = upload.single('myFile');

  app.get(baseUrl+"letterOfCredit/getAccounts", function(req, res) {
    var accounts= [];
    accounts[0] = nodeB_Accounts[3];
    accounts[1] = nodeB_Accounts[4];
    accounts[2] = nodeB_Accounts[5];
    accounts[3] = nodeB_Accounts[6];
    accounts[4] = nodeB_Accounts[7];
  	res.send(accounts);
  });
  app.get(baseUrl+"letterOfCredit/getAccountBalances", function(req, res) {
    var balances= [];

    for(var i=0;i<nodeB_Accounts.length;i++){
  		nodeBbalances[i]=web3NodeB.fromWei(web3NodeB.eth.getBalance(nodeB_Accounts[i]), "ether");
  	}

    balances[0] = nodeBbalances[3];
    balances[1] = nodeBbalances[4];
    balances[2] = nodeBbalances[5];
    balances[3] = nodeBbalances[6];
    balances[4] = nodeBbalances[7];
  	res.send(balances);
  });

  app.get(baseUrl+"letterOfCredit/getContractData", function(req, res) {

  	var assetValue = LOC.assetValue();
    var lcStatus = LOC.lcStatus();
    var lcHash = LOC.lcHash();
    var bolHash1 = LOC.bolHash1();
    var bolHash2 = LOC.bolHash2();
    var buyerAddress = LOC.buyerAddress();
    var sellerAddress = LOC.sellerAddress();
    var shippingAgentAddress = LOC.shippingAgentAddress();
    var assetValue = LOC.assetValue();

    var contractData ={
     lcStatus:lcStatus,
     lcHash:lcHash,
     bolHash1:bolHash1,
     bolHash2:bolHash2,
     buyerAddress: buyerAddress,
     sellerAddress:sellerAddress,
     shippingAgentAddress:shippingAgentAddress,
     assetValue: assetValue
    }
  	res.send(contractData);
  });

  app.get(baseUrl+"letterOfCredit/requestToIssueLC", function(req, res) {
    var txId = LOC.issueLCRequest({from:web3NodeB.eth.accounts[0]});
  	var transaction = web3NodeB.eth.getTransaction(txId);
  	customTransactionLog("Request To Issue LC",txId,transaction);
  	res.send(txId);
  });
  app.post(baseUrl+"letterOfCredit/issueLC", pdfUpload, function(req, res) {
    var tmp_path = req.file.path;
    var target_path="./targetFiles/LetterOfCredit/LetterOfCredit.pdf";
    fs.rename(tmp_path, target_path, function(err) {
          if (err) throw err;
          // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
            });
     });
     var options={
		     files:['./targetFiles/LetterOfCredit/LetterOfCredit.pdf'],
		     algorithm: "sha256"
	      }
	  hashFiles(options, function(error, hash) {
    	  // hash will be a string if no error occurred
		    console.log("Issuing Bank Upload Lc File hash: "+hash);
	 	    //res.send(hash);
        var txId=LOC.issueLC(hash,{from:web3NodeB.eth.accounts[0]});
      	var transaction = web3NodeB.eth.getTransaction(txId);
      	customTransactionLog("Issue LC",txId,transaction);
        res.send(txId);
	  });


  });
  app.get(baseUrl+"letterOfCredit/verifyLC", function(req, res) {
    var txId = LOC.verifyLC({from:web3NodeB.eth.accounts[0]});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Verify LC",txId,transaction);
    res.send(txId);
  });
  app.get(baseUrl+"letterOfCredit/dispatchGoods", function(req, res) {
    var txId = LOC.dispatchGoods(req.query.sellerAddress,{from:web3NodeB.eth.accounts[0]});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Seller Dispatched Goods",txId,transaction);
    res.send(txId);
  });
  app.post(baseUrl+"letterOfCredit/uploadBOL", bolUpload ,function(req, res) {

    var tmp_path = req.file.path;
    var target_path="./targetFiles/LetterOfCredit/billOfLading";
    fs.rename(tmp_path, target_path, function(err) {
          if (err) throw err;
          // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
            });
     });
     var options={
		     files:['./targetFiles/LetterOfCredit/billOfLading'],
		     algorithm: "sha256"
	      }

	  hashFiles(options, function(error, hash) {
    	  // hash will be a string if no error occurred
		    console.log("Shiipping Agent uploaded BOL hash : "+hash);
	 	    //res.send(hash);
        var txId=LOC.uploadBOL(hash,{from:web3NodeB.eth.accounts[0]});
        var transaction = web3NodeB.eth.getTransaction(txId);
        customTransactionLog("Shipping Agent Uploaded BOL",txId,transaction);
        //res.send(txId);
	  });

  });
  app.get(baseUrl+"letterOfCredit/transportGoods", function(req, res) {
    var txId = LOC.transportGoods({from:web3NodeB.eth.accounts[0]});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Shipping Agent Disatched Goods to Buyer",txId,transaction);
    res.send(txId);
  });
  app.get(baseUrl+"letterOfCredit/goodsDelivered", function(req, res) {
    var txId = LOC.goodsDelivered(req.query.shippingAgentAddress,{from:web3NodeB.eth.accounts[0]});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Shipping Agent Confirms That GOods Have Been Delivered",txId,transaction);
    res.send(txId);
  });
  app.get(baseUrl+"letterOfCredit/goodsReceived", function(req, res) {
    var txId=LOC.goodsReceived(20,{from:web3NodeB.eth.accounts[3],value: web3NodeB.toWei(20, 'ether')});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Buyer Confirems that goods have been received",txId,transaction);
    res.send(txId);
  });
  app.get(baseUrl+"letterOfCredit/confirmPayment", function(req, res) {
    var txId = LOC.confirmPayment({from:web3NodeB.eth.accounts[0]});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Issuing Banks asks Buyer to make Payement ",txId,transaction);
    res.send(txId);
  });
  app.get(baseUrl+"letterOfCredit/makePayment", function(req, res) {
    var txId = LOC.makePayment({from:web3NodeB.eth.accounts[0]});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Buyer Confirms to make Payement",txId,transaction);
    res.send(txId);
  });
  app.get(baseUrl+"letterOfCredit/clearContract", function(req, res) {
    var txId = LOC.clearContract({from:web3NodeB.eth.accounts[0]});
    var transaction = web3NodeB.eth.getTransaction(txId);
    customTransactionLog("Clear Contract Data",txId,transaction);
    res.send(txId);
  });
}

module.exports = letterOfCredit;
