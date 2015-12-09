/*
This is the main file for the backend
*/

// Importing necessary modules
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Setting up the routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/landing', function(req, res){
	res.sendFile(__dirname + '/views/landing.html');
});

app.get('/game_start', function(req, res){
	res.sendFile(__dirname + '/views/game_start.html');
});

app.get('/howto', function(req, res){
	res.sendFile(__dirname + '/views/howto.html');
});

// Once the game starts, these are events that the server listens for
io.on('connection', function(socket){

	socket.on('goonGuess', function(msg){
		io.emit('goonGuess', msg);
	});

	socket.on('goonSolve', function(msg){
		io.emit('goonSolve', msg);
	});

	socket.on('topDawgThumbsUp', function(thumbsUpId){
		io.emit('topDawgThumbsUp', thumbsUpId);
	});

	socket.on('topDawgThumbsDown', function(thumbsDownId){
		io.emit('topDawgThumbsDown', thumbsDownId);
	});

	socket.on('solutionFound', function(thumbsUpId){
		io.emit('solutionFound', thumbsUpId);
	});

});

// Hard coded the port for simplicity at the moment
http.listen(3000, function(){
	console.log('listening on *:3000');
});