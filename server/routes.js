var fs = require('fs');
var hashFiles = require('hash-files');
var multer  = require('multer');
var Web3= require('web3');
var baseUrl = "/ethereumDapp/";

var upload = multer({dest:'./uploads/'});
var pdfUpload = upload.single('pdfFile');

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


app.get("/ethereumDapp/", function(req, res) {

   	 res.send("Hello World");
});
app.post("/ethereumDapp/uploadLC", pdfUpload, function(req, res) {

 //console.log(req);
 console.log(req.file.path);
 var tmp_path = req.file.path;
 var target_path="./targetFiles/LetterOfCredit/LetterOfCredit.pdf";
 fs.rename(tmp_path, target_path, function(err) {
       if (err) throw err;
       // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
         fs.unlink(tmp_path, function() {
             if (err) throw err;
         });
  });
res.status(200).end();
});

}
module.exports = appRouter;
