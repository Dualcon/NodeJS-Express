https://codeforgeek.com/2014/09/manage-session-using-node-js-express-4/
#Express-Session

Session handling in any web application is very important and must have thing, without it we won’t be able to track user and it’s activity.
To demonstrate Session handling in Node, we have developed a small Log-in and log-out System. In this User can log-in by providing their email, and that email will be used for further Session tracking. Once User log-out, Session will be destroyed and User will be redirected to home page.
Important !
If you are familiar with Express and using its in built body-parser and session, then it’s no more and you have to now install those dependencies separately.  Following are the dependencies which we have used for this System.

## Installation
$ npm install express --save
$ npm install body-parser --save
$ npm install express-session --save

## Let's code!

Create a simple Express app and include express-session on it.

"""
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
"""

 After this, we have to initialize the session and we can do this by using following:
 
 """
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Express-Session middleware.
app.use(session({
	name: 'server-session-cookie-id',
	secret: 'my express secret',
	resave: false,
	saveUninitialized: false
}));
 """
 
 Here ‘secret‘ is used for cookie handling etc but we have to put some secret for managing Session in Express.
Now using ‘request‘ variable you can assign session to any variable. Just like we do in PHP using $_SESSION variable. for e.g

"""
var sess;
"""

After creating Session variables like sess.email , we can check whether this variable is set or not in other routers and can track the Session easily.

Here is the server.js code:
"""
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
"""

In code there are three routers. First which render the home page, second router is use for admin area where user can only go if he/she is log-in and third is to perform session destruction and logging out the user.
Each router checks whether the sess.email variable is set or not and that could be set only by logging in through front-end. Here is the HTML code:

"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>Express Sessions</title>
</head>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        email=$("#email").val();
        pass=$("#password").val();
        /*
        * Perform some validation here.
        */
        $.post("http://localhost:3000/login",{email:email,pass:pass},function(data){        
            if(data==='done')           
            {
                window.location.href="/admin";
            }
        });
    });
});
</script>
<body>
<label>Email: </label><input type="text" size="40" placeholder="Type your email" id="email"><br />
<label>Password: </label><input type="password" size="40" placeholder="Type your password" id="password"><br />
<input type="button" value="Submit" id="submit">
</body>
</html>
"""

Conclusion:
Like mentioned before session is very important for any web application. Node.js allows us to create HTTP server and HTTP is stateless protocol. It stores no information about previous visit and Express solves this problem very beautifully.