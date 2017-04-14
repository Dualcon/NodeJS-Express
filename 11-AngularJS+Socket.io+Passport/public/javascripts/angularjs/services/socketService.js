app.factory('SocketService', function ($rootScope, NavService) {

	var service = {};
	var socket = io();
	service.clients = [];
	service.messages = [];

	// User enter the chat room:
	socket.on('enter', function(msg){
		$rootScope.$apply(function () {
			service.messages.push(msg);
			new Audio('/audio/user_enter.mp3').play();
		});
	});

	// User left the room:
	socket.on('left', function(msg){
		$rootScope.$apply(function () {
			service.messages.push(msg);
			new Audio('/audio/user_left.mp3').play();
		});
	});

	// New chat message sended:
	service.send = function(eventName, data) {
		socket.emit(eventName, data);
	};

	// New chat message received:
	socket.on('chat message', function(msg){
		$rootScope.$apply(function () {
			service.messages.push(msg);
			new Audio('/audio/new_message.mp3').play();
		});
	});

	// Number of clients:
	socket.on('clients', function(data) {
		$rootScope.$apply(function () {
			angular.copy(data.updates, service.clients);
		});
	});

	return service;
});
