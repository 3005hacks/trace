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

$(document).on('click', '.thumbs-up', function(){
	socket.emit('topDawgThumbsUp', self.id);
	return false;
});

$(document).on('click', '.thumbs-down', function(){
	socket.emit('topDawgThumbsDown', self.id);
	return false;
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
				<img ' + ' class="thumbs-up" src="/img/thumb.png"> <img class="thumbs-down" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));
	thumbsUpCount += 1;
	thumbsDownCount += 1;
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
	thumbsUpCount += 1;
	thumbsDownCount += 1;
});

socket.on('topDawgThumbsUp', function(thumbsUpId){
	$(thumbsUpId).css('background-color', 'green');
});

socket.on('topDawgThumbsDown', function(thumbsDownObj){
	// thumbsDownObj.css('background-color', 'red');
});

function toggleID(element){
	$('#' + 'element').toggle();
}

function showSignin(){
	$('#signup-form').toggle();
	$('#signin-form').toggle();
	if($('#login-link').html() == "sign up"){
		$('#login-link').html("sign in");
	}
	else if($('#login-link').html() == "sign in"){
		$('#login-link').html("sign up");
	}	
}

$('#sign-in').click( function(){
	showSignin();
});