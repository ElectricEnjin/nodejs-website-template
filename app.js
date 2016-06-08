
var express = require('express');
var compression = require('compression');

var app = express();

//Compression
app.use(compression({
	level: 9
}));

// Marko
var marko = require('marko');
// Marko transpiler
require('marko/node-require').install({extension: ".html"});
// Marko hot reloading
require('./marko-hot-reload.js')();

// Static assets
app.use(express.static('public'));
app.use(express.static('components'));

// Body Parser
var bodyParser = require('body-parser')
// Form data parser
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
require('./routes/routes.js')(app);

app.listen(3000);