var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var PORT = 5000;


var app = express();
app.use(express.static(__dirname + '/../client/dist'));

console.log(`listening on port ${PORT}`);
app.listen(PORT);

module.exports = app;