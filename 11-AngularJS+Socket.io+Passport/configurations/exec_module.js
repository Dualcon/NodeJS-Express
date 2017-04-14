var command = 'node c:/server.js';

/*
var exec = require('child_process').exec;
var child = exec(command);
child.stdout.on('data', function(data) {
	console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
	console.log('stdout: ' + data);
});
child.on('close', function(code) {
	console.log('closing code: ' + code);
});
*/

var execChildCommand = function(command) {
	console.log('Command: ' + command);
};

module.exports.execChildCommand = execChildCommand;