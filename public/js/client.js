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

function showGuessInput(){
	$('#input-solve').hide();
	$('#solve-button').hide();
	$('#input-guess').show();
	$('#guess-button').show();
	$('#showGuess').hide();
	$('#showSolve').show();
}

function showSolveInput(){
	$('#input-solve').show();
	$('#solve-button').show();
	$('#input-guess').hide();
	$('#guess-button').hide();
	$('#showSolve').hide();
	$('#showGuess').show();
}

socket.on('goonGuess', function(msg){
	$('#feed').append($(
		'\
		<div class = "card">\
			<div class = "lead-text">The clue for this game is...</div>\
			<div class="card-content">' + msg + '</div>\
			<div class="vote-deck">\
				<img id="thumbs-up-' + thumbsUpCount + '" class="thumbs-up" src="/img/thumb.png"> <img id="thumbs-down-' + thumbsDownCount + '" class="thumbs-down" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));
	thumbsUpCount += 1;
	thumbsDownCount += 1;

	$('.thumbs-up').click(function(){
		socket.emit('topDawgThumbsUp', this.id);
		return false;
	});

	$('.thumbs-down').click(function(){
		socket.emit('topDawgThumbsDown', this.id);
		return false;
	});
});

socket.on('goonSolve', function(msg){
	$('#feed').append($(
		'\
		<div id = "guess" class = "card">\
			<div id = "guesser" class = "lead-text">Larry guessed...</div>\
			<div class="card-content">' + msg + '</div>\
			<div class="vote-deck">\
				<img id="thumbs-up-' + thumbsUpCount + '" class="thumbs-up" src="/img/thumb.png"> <img id="thumbs-down-' + thumbsDownCount + '" class="thumbs-down" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));
	thumbsUpCount += 1;
	thumbsDownCount += 1;

	$('.thumbs-up').click(function(){
		socket.emit('topDawgThumbsUp', this.id);
		return false;
	});

	$('.thumbs-down').click(function(){
		socket.emit('topDawgThumbsDown', this.id);
		return false;
	});
});

socket.on('topDawgThumbsUp', function(thumbsUpId){
	$('#'+thumbsUpId).closest('.vote-deck').children('.thumbs-down').off();
	$('#'+thumbsUpId).replaceWith($('<img class="thumbs-up-gold" src="/img/correct.png">'));
});

socket.on('topDawgThumbsDown', function(thumbsDownId){
	$('#'+thumbsDownId).closest('.vote-deck').children('.thumbs-up').off();
	$('#'+thumbsDownId).replaceWith($('<img class="thumbs-down-gold" src="/img/wrong.png">'));
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