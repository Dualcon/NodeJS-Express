#Cookie Management 

##What is a cookie?
Cookies are small pieces of data sent from a website and are stored in user's web browser while user is browsing that website. Every time the user loads that website back, the browser sends that stored data back to website or server, to distinguish user's previous activity.

##Installation
$ npm install cookie-parser --save

## Add cookie-parser to Express app:

"""
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.static('public'));
app.use(cookieParser());
"""

cookie-parser parses Cookie header and populate req.cookies with an object keyed by the cookie names. To set a new cookie lets define a new route in your express app like :

## Add cookie:
"""
app.get('/', function(req, res){
	res.send(JSON.stringify(req.cookies));
});

app.get('/cookie',function(req, res){
	res.cookie('cookie_name', 'cookie_value').send('Cookie is set');
});
"""

##Delete cookie
Existing cookies can be deleted very easily using clearCookie method, which accepts the name of the cookie which you want to delete.

"""
app.get('/clearcookie', function(req,res){
	res.clearCookie('cookie_name');
	res.send('Cookie deleted');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
"""

Run the example with the command:
$ node server.js

On your browser execute this routes:
Show the cookies:
http://localhost:3000/
Add a new cookie:
http://localhost:3000/cookie
Remove a cookie:
http://localhost:3000/clearcookie