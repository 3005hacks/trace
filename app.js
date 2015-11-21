var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/landing.html');
});

io.on('connection', function(socket){

	socket.on('goonClue', function(msg){
		io.emit('goonClue', msg);
	});

	socket.on('goonGuess', function(msg){
		io.emit('goonGuess', msg);
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});