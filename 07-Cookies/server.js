var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.static('public'));
app.use(cookieParser());

app.get('/', function(req, res){
	res.send(JSON.stringify(req.cookies));
});

app.get('/cookie',function(req, res){
	res.cookie('cookie_name', 'cookie_value').send('Cookie is set');
});

app.get('/clearcookie', function(req,res){
	res.clearCookie('cookie_name');
	res.send('Cookie deleted');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});