// instantiates socket
var socket = io();

var currentUser = Parse.User.current();

// Sends the guess
var guessSubmit = function() {

	var usr_guess = $('#input-guess').val();
	var goonGuess = {

		guessed: usr_guess,
		username: currentUser.getUsername(),
		isGif: false
	};

	var Guess = Parse.Object.extend("Guesses");
	var guess = new Guess();

	if (isGif($('#input-guess').val())) {

		makeGif(getGifWord(usr_guess), function(url) {

			guess.save({

		      	text: url,
		      	username: currentUser.getUsername(),
		      	isGif: true,
		      	game: gameObject,
		      	isGuess: true
		    	}, {
		      	success: function(game) {

		        	// If object is stored correctly
		        	console.log('Guess saved');
		        	goonGuess.guessed = url;
		        	goonGuess.isGif = true;
		        	goonGuess.id = game.id;
		        	console.log(goonGuess);
					socket.emit('goonGuess', goonGuess);
					$('#input-guess').val('');
					var relation = gameObject.relation("guesses");
					relation.add(game);
					gameObject.save();
					return false;

		      	}, error: function(gameScore, error) {
		      
		        // error handling goes here
		      	}
		    });

		});

	}
	else {
		var Guess = Parse.Object.extend("Guesses");
		var guess = new Guess();

		guess.save({
	      	text: goonGuess.guessed,
	      	username: currentUser.getUsername(),
	      	isGif: false,
	      	game: gameObject,
	      	isGuess: true
	    }, {
	      	success: function(game) {

	        	// If object is stored correctly
	        	console.log('Guess saved');
	        	goonGuess.id = game.id;
	        	socket.emit('goonGuess', goonGuess);
				$('#input-guess').val('');
				var relation = gameObject.relation("guesses");
				relation.add(game);
				gameObject.save();
				return false;    
		    },
	      	error: function(gameScore, error) {
	      
	        	// error handling goes here
	      	}
	    });
	}
}

// Guess button
$('#guess-button').click( function() {
	guessSubmit();
});

// Sends submit message
var solveSubmit = function(){

	var goonSolve = {

		solveText: $('#input-solve').val(),
		username: currentUser.getUsername()
	};

	var Solve = Parse.Object.extend("Solutions");
	var solve = new Solve();

	solve.save({
      text: goonSolve.solveText,
      username: currentUser.getUsername(),
      game: gameObject,
      isGuess: false
    }, {
      success: function(game) {

        // If object is stored correctly
        console.log('Solve saved');
        goonSolve.id = game.id;
        // emits Solve text
		socket.emit('goonSolve', goonSolve);
		$('#input-solve').val('');
		var relation = gameObject.relation("solves");
		relation.add(game);
		gameObject.save();
		return false;
        
      },
      error: function(gameScore, error) {
      
        // error handling goes here
      }
	});
}

$('#solve-button').click(function() {
	solveSubmit();
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

// show Guess box
function showGuessInput(){
	$('#input-solve').hide();
	$('#solve-button').hide();
	$('#input-guess').show();
	$('#guess-button').show();
	$('#showGuess').hide();
	$('#showSolve').hide();
	$('#back-button').show();
}

// show Solve box
function showSolveInput(){
	$('#input-solve').show();
	$('#solve-button').show();
	$('#input-guess').hide();
	$('#guess-button').hide();
	$('#showSolve').hide();
	$('#showGuess').hide();
	$('#back-button').show();
}

// Change back to original guess menu
function changeGuessOption(){
	$('#input-solve').hide();
	$('#solve-button').hide();
	$('#input-guess').hide();
	$('#guess-button').hide();
	$('#showSolve').show();
	$('#showGuess').show();
	$('#back-button').hide();
}

// listener for Guess signal
socket.on('goonGuess', function(goonGuess){

	var cardContent = goonGuess.guessed;
	if (goonGuess.isGif) {

		console.log(true);
		console.log(data);
		cardContent = '<img style= "height: 18rem" class="gif" src="' + goonGuess.guessed + '">';
	}

	$('#feed').append($(
		'\
		<div class = "card">\
			<div class = "lead-text">'+ goonGuess.username +' guessed...</div>\
			<div class="card-content">' + cardContent + '</div>\
			<div class="vote-deck">\
				<img id="thumbs-up-' + goonGuess.id + '" class="thumbs-up-guess" src="/img/thumb.png"> <img id="thumbs-down-' + goonGuess.id + '" class="thumbs-down-guess" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));

	$('#thumbs-up-'+goonGuess.id).click(function(){
		// if (topDawg){
			socket.emit('topDawgThumbsUp', this.id);
	 		return false;
		// }
 	});

	$('#thumbs-down-'+goonGuess.id).click(function(){
		// if (topDawg){
	 		socket.emit('topDawgThumbsDown', this.id);
	 		return false;
	 	// }
 	});
});

// listener for Solve signal
socket.on('goonSolve', function(goonSolve){

	$('#feed').append($(
		'\
		<div class = "card">\
			<div class = "lead-text">'+ goonSolve.username + ' tried to answer with...</div>\
 			<div class="card-content">' + goonSolve.solveText + '</div>\
 			<div class="vote-deck">\
				<img id="thumbs-up-' + goonSolve.id + '" class="thumbs-up-solve" src="/img/thumb.png"> <img id="thumbs-down-' + goonSolve.id + '" class="thumbs-down-solve" src="/img/thumbdown.png">\
			</div>\
		</div>\
		'
	));

	$('#thumbs-up-'+goonSolve.id).click(function(){
		// if (topDawg){
			socket.emit('solutionFound', this.id);
	 		return false;
	 	// }
 	});

	$('#thumbs-down-'+goonSolve.id).click(function(){
		// if (topDawg){
	 		socket.emit('topDawgThumbsDown', this.id);
	 		return false;
	 	// }
 	});
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
	winner(Parse.User.current().getUsername());
});

// when a goon wins
function winner(winnerName) {
	$('#winner-pop-up').append(winnerName + ' has won!');
	$('#feed').hide();
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

$(document).ready(function(){
    $("#input-guess").keyup(function(e){
        if (e.which === 13){
            guessSubmit();
        }
    })

    $("#input-solve").keyup(function(e){
        if (e.which === 13){
            solveSubmit();
        }
    })
});