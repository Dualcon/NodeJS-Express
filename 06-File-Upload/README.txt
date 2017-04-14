#File Upload

The following HTML code creates a file uploader form. This form is having method attribute set to POST and enctype attribute is set to multipart/form-data

"""
<html>
<body>
<form action="/upload" method="POST" enctype="multipart/form-data">
<input type="file" name="userPhoto" multiple />
      <input type="submit" value="Upload Image" name="submit">
      <input type='text' id='random' name='random'><br>
      <span id = "status"></span>
</form>
</body>
</html>
"""

Let's save above code in index.html and modify server.js to handle home page request as well as file upload.

"""
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
"""

The only line you need to put your focus on is this
var upload = multer({ storage : storage }).array('userPhoto',2);
Here rather than .single() we are using .array(selector,fileLimit) of Multer. Multer will accept array of files limiting to max 2 file at each time. You can of course increase the number as you may need.

Now access http://localhost:3000 and try the example.