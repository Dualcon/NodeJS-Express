var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Express-Session middleware.
app.use(session({
	name: 'server-session-cookie-id',
	secret: 'my express secret',
	resave: false,
	saveUninitialized: false
}));

var sess;

app.get('/', function(req, res) {
	sess = req.session;
	if (sess.email) {
		res.redirect(__dirname + "/user.html");
	} else {
		res.sendFile(__dirname + "/index.html");
	}
});

app.post('/login',function(req,res){
	sess = req.session;
	//In this we are assigning email to sess.email variable. The email comes from HTML page.
	sess.email = req.body.email;
	console.log(req.body);
	res.end('done');
});

app.get('/admin',function(req,res){
	sess = req.session;
	if(sess.email) {
		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		res.write('<h1>Hello '+sess.email+'</h1>');
		res.end('<a href="/logout">Logout</a>');
	} else {
		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		res.write('<h1>Please login first.</h1>', 'utf-8');
		res.write('<a href="/">Login</a>', 'utf8');
		res.end();
	}
});

app.get('/logout',function(req,res){
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});