var express = require('express');

var app = express();

//respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
	res.send('Hello');
});

//This responds a POST request for the homepage
app.post('/', function (req, res) {
	console.log("Got a POST request for the homepage");
	res.send('Hello POST');
});

//This responds a DELETE request for the /del_user page.
app.delete('/delUser', function (req, res) {
	console.log("Got a DELETE request for /del_user");
	res.send('Hello DELETE');
});

//This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
	console.log("Got a GET request for /list_user");
	res.send('Page Listing');
});

//This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
	console.log("Got a GET request for /ab*cd");
	res.send('Page Pattern Match');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});