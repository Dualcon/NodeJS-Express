var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");	
});

app.get('/process_get', function (req, res) {
	// Prepare output in JSON format
	response = {
			first_name:req.query.first_name,
			last_name:req.query.last_name
	};
	// End the response process.
	res.end(JSON.stringify(response));
});

app.listen(4002, function () {
	console.log('Example app listening on port 3000!');
});