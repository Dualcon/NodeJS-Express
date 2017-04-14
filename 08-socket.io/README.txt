#Expresss.js and Socket.io

Sockets have traditionally been the solution around which most realtime chat systems are architected, providing a bi-directional communication channel between a client and a server.
This means that the server can push messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.

##The first goal is to setup a simple HTML webpage that serves out a form and a list of messages. We’re going to use the Node.JS web framework express to this end. Make sure Node.JS is installed.
$ npm install express --save

Now that express is installed we can create a server.js file that will setup our application.

"""
var express = require('express');
var app = express();

var http = require('http').Server(app);

http.listen(3000, function(){
	console.log('Example ruuning on port 3000!');
});
"""

This translates into the following:
1. Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2). 
2. We define a route handler / that gets called when we hit our website home.
3. We make the http server listen on port 3000.
If you run node index.js you should see the following:
And if you point your browser to http://localhost:3000:

##Serving HTML page:

"""
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});
"""

And populate index.html with the following:

"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>Socket.io example</title>
</head>
<body>
<ul id="messages"></ul>
<button onclick="myFunction()">Click me</button></body>
</html>
"""

##Integrating Socket.IO
Socket.IO is composed of two parts:
• A server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io
• A client library that loads on the browser side: socket.io-client
During development, socket.io serves the client automatically for us, as we’ll see, so for now we only have to install one module:
$ npm install socket.io --save
That will install the module and add the dependency to package.json. Now let’s edit index.js to add it:

"""
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

io.on('connection', function(socket){
	console.log('A user connected.');
});

http.listen(3000, function(){
	console.log('Example ruuning on port 3000!');
});
"""

Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object. Then I listen on the connection event for incoming sockets, and I log it to the console.
Now in index.html I add the following snippet before the </body>:

"""
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
"""

That’s all it takes to load the socket.io-client, which exposes a io global, and then connect.
Notice that I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page.
If you now reload the server and the website you should see the console print “a user connected”.
Try opening several tabs, and you’ll see several messages:
Each socket also fires a special disconnect event:

"""
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
"""

Then if you refresh a tab several times you can see it in action:

##Emitting events

The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.
Our html page should be like this:

"""
<script src="/socket.io/socket.io.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  var socket = io();
  function myFunction() {
	  socket.emit('chat message', 'Hello World!');
  }
</script>
"""

And in server.js we print out the chat message event:

"""
io.on('connection', function(socket){
	console.log('A user connected.');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log(msg);
	});
});
"""
 
##Broadcasting

The next goal is for us to emit the event from the server to the rest of the users.
In order to send an event to everyone, Socket.IO gives us the io.emit:
io.emit('some event', { for: 'everyone' });
If you want to send a message to everyone except for a certain socket, we have the broadcast flag:
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});
In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.

"""
io.on('connection', function(socket){
	console.log('A user connected.');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log(msg);
		io.emit('chat message', msg);
	});
});
"""

And on the client side when we capture a chat message event we’ll include it in the page. The total client-side JavaScript code now amounts to:

"""
<script src="/socket.io/socket.io.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  var socket = io();
  function myFunction() {
	  socket.emit('chat message', 'Hello World!');
  }
  socket.on('chat message', function(msg){
	    $('#messages').append($('<li>').text(msg));
	  });
</script>
"""

Done, enjoy it!