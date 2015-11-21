var socket = io();

$('#guess-button').click(function(){
	socket.emit('goonGuess', $('#m').val());
	$('#m').val('');
	return false;
});

$('#solve-button').click(function(){
	socket.emit('goonSolve', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('goonGuess', function(msg){
	$('.content').append($(
		'\
		<div class = "card">\
			<div class = "lead-text">The clue for this game is...</div>\
			<div class="card-content">' + msg + '</div>\
			<div class="vote-deck">\
				<img src="/img/thumb.png"> <img src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));
});

socket.on('goonSolve', function(msg){
	$('.content').append($(
		'\
		<div id = "guess" class = "card">\
			<div id = "guesser" class = "lead-text">Larry guessed...</div>\
			<div class="card-content">' + msg + '</div>\
			<div class="vote-deck">\
				<img src="/img/thumb.png"> <img src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));
});