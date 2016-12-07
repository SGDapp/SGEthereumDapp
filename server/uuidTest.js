var uuid = require('node-uuid');
var crypto = require('crypto');
var fs = require('fs');

var key = uuid();

key = crypto.createHash('sha256')
        .update(key)
        .update('salt')
        .digest('hex');
        
var keyVar = "Mercury_Api_Key=" + key;
fs.writeFile('.env', keyVar , function (err) {
  if (err) return console.log(err);
  console.log("Api Key has be regenerated and Updated");
});



