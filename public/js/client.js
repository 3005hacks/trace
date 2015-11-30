// instantiates socket
var socket = io();
var currentUser = Parse.User.current();

// Guess button
$('#guess-button').click( function() {

	// emits Guess text
	var goonGuess = {

		guessed: $('#input-guess').val(),
		username: currentUser.getUsername()
	};

	socket.emit('goonGuess', goonGuess);
	$('#input-guess').val('');
	return false;
});

// Solve button
$('#solve-button').click( function() {

	// emits Solve text
	socket.emit('goonSolve', $('#input-solve').val());
	$('#input-solve').val('');
	return false;
});

// sign in link
$('#sign-in-link').click( function() {
	showSignin();
});

// show sign in
function showSignin(){
	$('#sign-in-form').show();
	$('#sign-up-form').hide();
	$('#vid').hide();
	// if($('#sign-in-link').html() == "sign up"){
	// 	$('#sign-in-link').html("sign in");
	// }
	// else if($('#sign-in-link').html() == "sign in"){
	// 	$('#sign-in-link').html("sign up");
	// }
}

// sign up link
$('#sign-up-link').click( function() {
	showSignup();
});

// show sign up
function showSignup() {
	$('#sign-up-form').show();
	$('#sign-in-form').hide();
	$('#vid').hide();
}

$('#join-button').click( function() {
	login();
});

$('#go-in-button').click( function() {
	newUser();
});

// how-to link
$('#how-to-link').click( function() {
	var topOfHowTo = $('.howto').offset().top;
	$('body, html').animate({ scrollTop:topOfHowTo });
});

// show Guess stuff
function showGuessInput(){
	$('#input-solve').hide();
	$('#solve-button').hide();
	$('#input-guess').show();
	$('#guess-button').show();
	$('#showGuess').hide();
	$('#showSolve').show();
}

// show Solve stuff
function showSolveInput(){
	$('#input-solve').show();
	$('#solve-button').show();
	$('#input-guess').hide();
	$('#guess-button').hide();
	$('#showSolve').hide();
	$('#showGuess').show();
}

// listener for Guess signal
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
				<div class = "lead-text">'+cardContent+' guessed...</div>\
				<div class="card-content">' + cardContent.guessed + '</div>\
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

// listener for Solve signal
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

// listener for Thumbs Up signal
socket.on('topDawgThumbsUp', function(thumbsUpId){
	$('#'+thumbsUpId).closest('.vote-deck').children('.thumbs-down-guess, .thumbs-down-solve').off();
	$('#'+thumbsUpId).replaceWith($('<img class="thumbs-up-gold" src="/img/correct.png">'));
});

// listener for Thumbs Down signal
socket.on('topDawgThumbsDown', function(thumbsDownId){
	$('#'+thumbsDownId).closest('.vote-deck').children('.thumbs-up-guess, .thumbs-up-solve').off();
	$('#'+thumbsDownId).replaceWith($('<img class="thumbs-down-gold" src="/img/wrong.png">'));
});

// listener for Solution Found signal
socket.on('solutionFound', function(thumbsUpId){
	$('#'+thumbsUpId).closest('.vote-deck').children('.thumbs-down-guess, .thumbs-down-solve').off();
	$('#'+thumbsUpId).replaceWith($('<img class="thumbs-up-gold" src="/img/correct.png">'));
	//winner('Ganesh');
});

// when a goon wins
function winner(winnerName) {
	$('#winner-pop-up').append(winnerName + ' has won!');
	$('#winner-pop-up').show();
}

// sign in button
$('#sign-in').click( function(){
	showSignin();
});

// play again button
$('#play-again').click(function(){
	window.location.replace('/game_start');
});