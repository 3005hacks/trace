/*
    These functions deal with setting up, joining, and creating games   
*/

// Opens a new socket
var socket = io();

var currentUser = Parse.User.current();

// Creates a new game
function createGame() {

    // Retrieves user information from the form
    var gamename_usr = encodeHTML($("#new-gamename").val());
    var question_usr = encodeHTML($("#new-question").val());
    var hint_usr = encodeHTML($("#new-hint").val());
    var pass_usr = encodeHTML($("#new-pass").val());

    // Opening the game class from Parse
    var Game = Parse.Object.extend("Games");
    var game = new Game();

    // Storing game object in Parse
    game.save({
      gamename: gamename_usr,
      question: question_usr,
      hint: hint_usr,
      topDawg: currentUser.getUsername(),
      password: pass_usr
    }, {
      success: function(game) {

        // If object is stored correctly
        currentUser.add("currentTopDawg", game.id);
        currentUser.save();
        window.open('landing', "_self");
        // socket.emit('goToLandingPage', gamename_usr);
        // return false;
        
      },
      error: function(gameScore, error) {
      
        // error is a Parse.Error with an error code and message.
      }
    });
}

// Joins a game already in progress
function joinGame() {

    // Retrieves user passcode from form
    var pass_given = encodeHTML($("#game-pass").val());

    // Games class from Parse
    var Game = Parse.Object.extend("Games");
    var query = new Parse.Query(Game);

    // Search for Game object with associated password
    query.equalTo("password", pass_given);

    // Retrieve first object with given pass word
    query.first({
      success: function(result) {

        // If there are no results, alert the user
        if (result === undefined) {

          alert("Not a valid Game Code!");
        }
        
        // If there is a match, open the game page
        else {

          currentUser.add("currentPlayer", result.id);
          currentUser.save();
          window.open('landing', "_self");
        }
      },

      // Error in the search
      error: function(error) {

        // Alert user of the error
        alert("Error: " + error.code + " " + error.message);
      }
    });
}

// Cleans user input
function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

// JQuery function to switch between forms
function showNewGame(){
	$('#game-form').show();
	$('#join-game-form').hide();
}

// JQuery function to switch between forms
function showJoinGame(){
	$('#game-form').hide();
	$('#join-game-form').show();
}

$(document).ready(function(){
    $("#new-pass").keyup(function(e){
        if (e.which === 13){
            createGame();
        }
    })

    $("#game-pass").keyup(function(e){
        if (e.which === 13){
            joinGame();
        }
    })
});