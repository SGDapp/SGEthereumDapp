var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/sample', function(req, res) {

  res.send("Hi");
});

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('mydb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'mydb' database");
        db.collection('mycollection', function(err, collection) {
		collection.find().toArray(function(err, items) {
		   console.log(items);
		});
	});
    }
});


var server = app.listen(3344, function () {
    console.log("Listening on port %s...", server.address().port);
});
