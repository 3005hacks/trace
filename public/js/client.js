var socket = io();

$('#clue-button').click(function(){
	socket.emit('goonClue', $('#m').val());
	$('#m').val('');
	return false;
});

$('#guess-button').click(function(){
	socket.emit('goonGuess', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('goonClue', function(msg){
	$('.content').append($(
		'\
		<div class = "card">\
		<div class = "lead-text">The clue for this game is...</div>\
		<div class="card-content">' + msg + '</div>\
		</div>\
		'
	));
});

socket.on('goonGuess', function(msg){
	$('.content').append($(
		'\
		<div id = "guess" class = "card">\
			<div id = "guesser" class = "lead-text">Larry guessed...</div>\
			<div class="card-content">' + msg + '</div>\
			<div class="vote-deck">\
			</div>\
		</div>\
		'
	));
});