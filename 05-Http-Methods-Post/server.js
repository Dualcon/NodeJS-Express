var express = require('express');
var bodyParser = require('body-parser');

//Create application/x-www-form-urlencoded parser
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");	
});

app.post('/process_post', urlEncodedParser, function (req, res) {
	// Prepare output in JSON format
	response = {
			first_name:req.body.first_name,
			last_name:req.body.last_name
	};
	// End the response process.
	res.end(JSON.stringify(response));
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});