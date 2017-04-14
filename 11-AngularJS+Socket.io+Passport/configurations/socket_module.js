var clients = {};
var clientsLength = 0;


var IoConnection = function(io) {

	this.io = io;


	//Socket.io :
	io.on('connection', function(socket){
		addClient(socket);
		socket.on('disconnect', function(){
			removeClient(socket);
		});
		socket.on('chat message', function(msg){
			sendMessage(socket, msg);
		});
	});

};


function addClient(socket) {
	// If the client already exists, add the new socket id:
	if (clients.hasOwnProperty(socket.request.sessionID)) {
		clients[socket.request.sessionID].sockets.push({id: socket.id});
	} else {
		// If the client do not exists, create it and save the soket id:
		clients[socket.request.sessionID] = {displayName: socket.request.user.displayName, sockets: [{id: socket.id}]};
		clientsLength ++;
		// Send message for all users except for the sender:
		socket.broadcast.emit('enter', {text: socket.request.user.displayName + ' enter to the room.'});
		updateNames();
	}
};


function removeClient(socket) {
	// Last connected socket:
	if (clients[socket.request.sessionID].sockets.length == 1) {
		delete clients[socket.request.sessionID];
		clientsLength --;
		io.emit('left', {text: socket.request.user.displayName + ' left the room.'});
		updateNames();
	} else {
		// Remove only disconnected socket id:
		var newArray = [];
		for (var i=0; i<clients[socket.request.sessionID].sockets.length; i++) {
			if (clients[socket.request.sessionID].sockets[i].id != socket.id) newArray.push({id: clients[socket.request.sessionID].sockets[i].id});
		}
		clients[socket.request.sessionID].sockets = newArray;
	}
};


function sendMessage(socket, msg) {
	var regExp = /\[([^)]+)\]/;
	var matches = regExp.exec(msg.text);

	// Message for everyone:
	if (matches == null) {
		io.emit('chat message', {user: socket.request.user.displayName, text: msg.text});
		return;			
	}

	// Message for a specific connected user:
	for (key in clients) {
		if (clients[key].displayName == matches[1]) {
			// Send message to all the sockets of the sender:
			for (var i=0; i<clients[socket.request.sessionID].sockets.length; i++) {
				var id = clients[socket.request.sessionID].sockets[i].id;
				io.to(id).emit('chat message', {user: socket.request.user.displayName, text: msg.text});
			}
			// Send message to all the sockets of the receiver:
			for (var i=0; i<clients[key].sockets.length; i++) {
				var id = clients[key].sockets[i].id;
				io.to(id).emit('chat message', {user: socket.request.user.displayName, text: msg.text});
			}
			return;
		}
	}

	// That user do not exists, so send a message to all the sockets of the sender:
	for (var i=0; i<clients[socket.request.sessionID].sockets.length; i++) {
		var id = clients[socket.request.sessionID].sockets[i].id;
		io.to(id).emit('chat message', {user: socket.request.user.displayName, text: 'Sorry, that user do not exists.'});
	}

};


function updateNames() {
	var updates = [];
	for(var key in clients) {
		updates.push({name: clients[key].displayName});
	}
	io.emit('clients', {updates: updates});
};


module.exports = IoConnection;

//sending to sender-client only
//socket.emit('message', "this is a test");
//sending to all clients, include sender
//io.emit('message', "this is a test");
//sending to all clients except sender
//socket.broadcast.emit('message', "this is a test");
//sending to all clients in 'game' room(channel) except sender
//socket.broadcast.to('game').emit('message', 'nice game');
//sending to all clients in 'game' room(channel), include sender
//io.in('game').emit('message', 'cool game');
//sending to sender client, only if they are in 'game' room(channel)
//socket.to('game').emit('message', 'enjoy the game');
//sending to all clients in namespace 'myNamespace', include sender
//io.of('myNamespace').emit('message', 'gg');
//sending to individual socketid
//socket.broadcast.to(socketid).emit('message', 'for your eyes only');
