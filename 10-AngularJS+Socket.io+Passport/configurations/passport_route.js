var app = require('../app');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

//Passport session middleware:
app.use(passport.initialize());
app.use(passport.session());

//Github passport strategy:
passport.use(new GithubStrategy({
	clientID: "4d4b70d4d0fca66ea372",
	clientSecret: "8dfbf333bfa6d4f3b9dd0839729dbef25b873802",
	callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
	return done(null, profile);
}));

//Facebook passport strategy:
passport.use(new FacebookStrategy({
	clientID: '274824549571190',
	clientSecret: '7502b71b08fb5436e340fd8c7e9747bb',
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
function(token, refreshToken, profile, done) {
	return done(null, profile);
}));

//Passport serializers:
passport.serializeUser(function(user, done) {
	// placeholder for custom user serialization
	// null is for errors
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	// placeholder for custom user deserialization.
	// maybe you are going to get the user from mongo by id?
	// null is for errors
	done(null, user);
});

//We will call this to start the GitHub Login process:
app.get('/auth/github', passport.authenticate('github'));

//GitHub will call this URL:
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
		function(req, res) {
	req.session.user = req.user;
	res.redirect('/');
}
);

//Facebook authentication:
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

//handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
		function(req, res) {
	req.session.user = req.user;
	res.redirect('/');
}
);