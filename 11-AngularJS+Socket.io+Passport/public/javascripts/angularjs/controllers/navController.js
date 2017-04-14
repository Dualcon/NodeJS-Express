app.controller("NavController", function($scope, NavService, SocketService) {

	$scope.isLogged = false;

	// Check if is logged:
	NavService.isAuthenticated().then(function(result) {
		if (result.data == 'true') {
			$scope.isLogged = true;
		}
		// Get main menu:
		$scope.menu = NavService.menu;
	});

	// Clients:
	$scope.clients = SocketService.clients;

	// Chat room messages:
	$scope.messages = SocketService.messages;

	// Send message:
	$scope.send = function(msg) {
		SocketService.send('chat message', msg);
		$scope.msg = null;
	};

	// Add text to input box:
	$scope.addToInputText = function(name) {
		$scope.msg = {text: '[' + name + '] '};
	}

	// Delete all messages:
	$scope.delete = function() {
		SocketService.messages.length = 0;
	};

});
