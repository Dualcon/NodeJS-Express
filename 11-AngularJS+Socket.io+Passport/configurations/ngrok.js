//Ngrok exposes your localhost to the web.
//http://localhost:4040/ 

//Configuration:
var ngrok = require('ngrok');
ngrok.connect(3000, function (err, url) {});

ngrok.once('connect', function(url) {
	
console.log('Ngrok running at: ' + url);
});
