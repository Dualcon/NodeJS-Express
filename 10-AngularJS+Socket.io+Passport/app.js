//Ngrok configuration:
require('./configurations/ngrok');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var session = require('express-session');

//Mongo DB configuration:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/IOTDB');
//Connect-Mongo store:
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

var app = express();
//app.js can be now required to bring app into any file:
app = module.exports = express();

//Server configuration:
var http = require('http').Server(app);
var io = require('socket.io')(http);
var passportSocketIo = require("passport.socketio");

//Socket.io configuration:
var IoConnection = require('./configurations/socket_module')(io);


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Express-Session middleware:
app.use(session({
	key: 'express.sid',
	secret: 'my express secret',
	resave: false,
	saveUninitialized: false,
	store: sessionStore 
}));

//Passport middleware:
require('./configurations/passport_route');

//passport-socket.io middleware: 
io.use(function(socket,next){
	passportSocketIo.authorize({
		cookieParser: cookieParser,
		key: 'express.sid',
		secret: 'my express secret',
		store: sessionStore,
		success:      onAuthorizeSuccess,
		fail:         onAuthorizeFail
	})(socket, next);
}
);

function onAuthorizeSuccess(data, accept){
	// The accept-callback still allows us to decide whether to accept the connection or not.
	accept();
	console.log('successful connection to socket.io');
};

function onAuthorizeFail(data, message, error, accept){
	// If you don't want to accept the connection
	if(error)
		accept(new Error(message));
	// this error will be sent to the user as a special error-package.
	console.log('failed connection to socket.io:', message);
};

//Main route:
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

//Logout
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

//Is authenticated
app.get('/isAuthenticated', function(req, res){
	if (req.isAuthenticated()) res.send('true');
	else res.send('false');
});

//HTTP configuration:
http.listen(3000, function(){
	console.log('Example ruuning on port 3000!');
});
