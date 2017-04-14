var express = require('express');

//Middleware for handling multipart/form-data.
var multer  = require('multer');

var app = express();

app.use(express.static('public'));

var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
		    callback(null, './public/uploads');
		  },
		  filename: function (req, file, callback) {
			    callback(null, file.fieldname + '-' + Date.now());
			  }
});
var upload = multer({ storage : storage }).array('userPhoto',2);

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");	
});

app.post('/upload',function(req,res){
	upload(req,res,function(err) {
		console.log(req.body);
		console.log(req.files);
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});