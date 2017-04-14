app.factory('NavService', function ($http, $window) {

	var service = {};

	// Main menu:
	service.menu = [
'<button onclick="window.location.href=\'#/\'" ng-show="true">Home</button>',
'<button onclick="window.location.href=\'#/chat\'" ng-show="isLogged == true">Chat</button>',
'<button onclick="window.location.href=\'/logout\'" ng-show="isLogged == true">Logout</button>'
];

	// Is authenticated:
	service.isAuthenticated = function() {
		return $http.get('/isAuthenticated').success(function(data){
		});
	};

	return service;
});
