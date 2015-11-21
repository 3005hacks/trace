var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/landing', function(req, res){
	res.sendFile(__dirname + '/views/landing.html');
});

app.get('/game_start', function(req, res){
	res.sendFile(__dirname + '/views/game_start.html');
});

io.on('connection', function(socket){

	socket.on('goonGuess', function(msg){
		console.log('1');
		io.emit('goonGuess', msg);
	});

	socket.on('goonSolve', function(msg){
		console.log('2');
		io.emit('goonSolve', msg);
	});

	socket.on('topDawgThumbsUp', function(thumbsUpObj){
		console.log('3');
		io.emit('topDawgThumbsUp', thumbsUpObj);
	});

	socket.on('topDawgThumbsDown', function(thumbsDownObj){
		console.log('4');
		io.emit('topDawgThumbsDown', thumbsDownObj);
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});