var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var api_Key_validator = function (req, res, next) {
  //console.log(process.env.Mercury_Api_Key);
  //console.log(req.headers.api_key);
  if((req.headers.api_key != process.env.Mercury_Api_Key)&&(req.query.Api_Key!='')){
	 res.status(500).send("Not Authorized. Invalid Api Key"); 
  }
  else
  next();
};

app.use(api_Key_validator);


app.get('/sample', function(req, res) {

  res.send("Hi");
});


var server = app.listen(3345, function () {
    console.log("Listening on port %s...", server.address().port);
});
