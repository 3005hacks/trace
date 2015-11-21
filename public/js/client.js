var socket = io();

$('#guess-button').click(function(){
	socket.emit('goonGuess', $('#input-guess').val());
	$('#input-guess').val('');
	return false;
});

$('#solve-button').click(function(){
	socket.emit('goonSolve', $('#input-solve').val());
	$('#input-solve').val('');
	return false;
});

$('.thumbs-up').click(function(){
	var currentUser = parse.User.current();
});

function showGuessInput(){
	$('#input-solve').hide();
	$('#solve-button').hide();
	$('#input-guess').show();
	$('#guess-button').show();
}
function showSolveInput(){
	$('#input-solve').show();
	$('#solve-button').show();
	$('#input-guess').hide();
	$('#guess-button').hide();
}

socket.on('goonGuess', function(msg){
	$('#feed').append($(
		'\
		<div class = "card">\
			<div class = "lead-text">The clue for this game is...</div>\
			<div class="card-content">' + msg + '</div>\
			<div class="vote-deck">\
				<img class="thumbs-up" src="/img/thumb.png"> <img class="thumbs-down" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));
});

socket.on('goonSolve', function(msg){
	$('#feed').append($(
		'\
		<div id = "guess" class = "card">\
			<div id = "guesser" class = "lead-text">Larry guessed...</div>\
			<div class="card-content">' + msg + '</div>\
			<div class="vote-deck">\
				<img class="thumbs-up" src="/img/thumb.png"> <img class="thumbs-down" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));
});