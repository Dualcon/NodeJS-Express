#HTTP Methods - Post

Here is a simple example which passes two values using HTML FORM POST method. We are going to use process_get router inside server.js to handle this input.

"""
<html>
<body>
<form action="http://127.0.0.1:8081/process_post" method="POST">
First Name: <input type="text" name="first_name">  <br>
Last Name: <input type="text" name="last_name">
<input type="submit" value="Submit">
</form>
</body>
</html>
"""

Let's save above code in index.html and modify server.js to handle home page request as well as input sent by the HTML form.

"""
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
"""

Now accessing HTML document using http://127.0.0.1:3000 will generate a form. You can enter First and Last Name and then click submit button to see the result and it should be like this:
{"first_name":"John","last_name":"Paul"}

Note: Express supports the following routing methods that correspond to HTTP methods: get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, and connect.