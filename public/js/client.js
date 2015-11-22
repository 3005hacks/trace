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

	if (isGif(msg)) {
		makeGif(getGifWord(msg), function(data) {
			console.log(data);
			var cardContent = '<img style= "height: 18rem" class="gif" src="' + data + '">';

			$('#feed').append($(
				'\
				<div class = "card">\
					<div class = "lead-text">A new clue has arrived...</div>\
					<div class="card-content">' + cardContent + '</div>\
					<div class="vote-deck">\
						<img id="thumbs-up-' + thumbsUpCount + '" class="thumbs-up-guess" src="/img/thumb.png"> <img id="thumbs-down-' + thumbsDownCount + '" class="thumbs-down-guess" src="/img/thumbdown.png">\
					</div>\
				</div>\
				'
			));

		});
	}
	else {
		var cardContent = msg;

		$('#feed').append($(
			'\
			<div class = "card">\
				<div class = "lead-text">A new clue has arrived...</div>\
				<div class="card-content">' + cardContent + '</div>\
				<div class="vote-deck">\
					<img id="thumbs-up-' + thumbsUpCount + '" class="thumbs-up-guess" src="/img/thumb.png"> <img id="thumbs-down-' + thumbsDownCount + '" class="thumbs-down-guess" src="/img/thumbdown.png">\
				</div>\
			</div>\
			'
		));
	}


	$('#thumbs-up-'+thumbsUpCount).click(function(){
		// if (topDawg){
			socket.emit('topDawgThumbsUp', this.id);
	 		return false;
		// }
 	});

	$('#thumbs-down-'+thumbsDownCount).click(function(){
		// if (topDawg){
	 		socket.emit('topDawgThumbsDown', this.id);
	 		return false;
	 	// }
 	});
	thumbsUpCount += 1;
	thumbsDownCount += 1;
});

socket.on('goonSolve', function(msg){

	$('#feed').append($(
		'\
		<div class = "card">\
			<div class = "lead-text">Someone guessed...</div>\
 			<div class="card-content">' + msg + '</div>\
 			<div class="vote-deck">\
				<img id="thumbs-up-' + thumbsUpCount + '" class="thumbs-up-solve" src="/img/thumb.png"> <img id="thumbs-down-' + thumbsDownCount + '" class="thumbs-down-solve" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));

	$('#thumbs-up-'+thumbsUpCount).click(function(){
		// if (topDawg){
			socket.emit('solutionFound', this.id);
	 		return false;
	 	// }
 	});

	$('#thumbs-down-'+thumbsDownCount).click(function(){
		// if (topDawg){
	 		socket.emit('topDawgThumbsDown', this.id);
	 		return false;
	 	// }
 	});
	thumbsUpCount += 1;
	thumbsDownCount += 1;
});

socket.on('topDawgThumbsUp', function(thumbsUpId){
	$('#'+thumbsUpId).closest('.vote-deck').children('.thumbs-down-guess, .thumbs-down-solve').off();
	$('#'+thumbsUpId).replaceWith($('<img class="thumbs-up-gold" src="/img/correct.png">'));
});

socket.on('topDawgThumbsDown', function(thumbsDownId){
	$('#'+thumbsDownId).closest('.vote-deck').children('.thumbs-up-guess, .thumbs-up-solve').off();
	$('#'+thumbsDownId).replaceWith($('<img class="thumbs-down-gold" src="/img/wrong.png">'));
});

socket.on('solutionFound', function(thumbsUpId){
	$('#'+thumbsUpId).closest('.vote-deck').children('.thumbs-down-guess, .thumbs-down-solve').off();
	$('#'+thumbsUpId).replaceWith($('<img class="thumbs-up-gold" src="/img/correct.png">'));
	//winner('Ganesh');
});

function winner(winnerName) {
	$('#winner-pop-up').append(winnerName + ' has won!');
	$('#winner-pop-up').show();
}

function toggleID(element){
	$('#' + 'element').toggle();
}

function showSignin(){
	$('#signin-form').show();
	$('#signup-form').hide();
	$('#vid').hide();
	// if($('#login-link').html() == "sign up"){
	// 	$('#login-link').html("sign in");
	// }
	// else if($('#login-link').html() == "sign in"){
	// 	$('#login-link').html("sign up");
	// }	
}
function showSignup(){
	$('#signup-form').show();
	$('#signin-form').hide();
	$('#vid').hide();
}

$('#sign-in').click( function(){
	showSignin();
});

$('#play-again').click(function(){
	window.location.replace('/game_start');
});