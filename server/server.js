var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');
var swaggerJSDoc = require('swagger-jsdoc');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

var routes = require("./routes.js")(app);


var swaggerDefinition = {
  info: {
    title: 'SG Ethereum Dapp',
    version: '1.0.0',
    description: 'Contains all Api endpints to interact with SGEthereum Dapp',
  },
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./features/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/swagger', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

var server = app.listen(3344, function () {
    console.log("Listening on port %s...", server.address().port);
});
