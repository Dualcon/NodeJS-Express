#Node.js - Express Framework

 
##Overview

Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It facilitates a rapid development of Node based Web applications. Following are some of the core features of Express framework:
Allows to set up middlewares to respond to HTTP Requests.
Defines a routing table which is used to perform different action based on HTTP Method and URL.
Allows to dynamically render HTML Pages based on passing arguments to templates.


##Installing Express

Firstly, install the Express framework globally using npm so that it can be used to create web application using node terminal.
$ npm install express --save
Above command saves installation locally in node_modules directory and creates a directory express inside node_modules. There are following important modules which you should install along with express:
body-parser - This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.
cookie-parser - Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
multer - This is a node.js middleware for handling multipart/form-data.
$ npm install body-parser --save
$ npm install cookie-parser --save
$ npm install multer --save


##Hello world Example

Following is a very basic Express app which starts a server and listens on port 3000 for connection. This app responds with Hello World! for requests to the homepage. For every other path, it will respond with a 404 Not Found.

"""
var express = require('express');

var app = express();

//respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
	res.send('hello world');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
"""

Save the above code in a file named server.js and run it with the following command.
$ node server.js

You will see the following output:
Example app listening at http://0.0.0.0:8081
Open http://127.0.0.1:8081/ in any browser and see the below result.