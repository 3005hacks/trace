var socket = io();

var currentUser = Parse.User.current();

function createGame() {

    var gamename_usr = encodeHTML(document.getElementById("new-gamename").value);
    var question_usr = encodeHTML(document.getElementById('new-question').value);
    var hint_usr = encodeHTML(document.getElementById("new-hint").value);
    var pass_usr = encodeHTML(document.getElementById("new-pass").value);

    var Game = Parse.Object.extend("Games");
    var game = new Game();

    game.save({
      gamename: gamename_usr,
      question: question_usr,
      hint: hint_usr,
      topDawg: currentUser.getUsername(),
      password: pass_usr
    }, {
      success: function(game) {
        // The object was saved successfully.
        currentUser.add("currentTopDawg", game.id);
        currentUser.save();
        window.open('landing', "_self");
        // socket.emit('goToLandingPage', gamename_usr);
        // return false;
        
      },
      error: function(gameScore, error) {
        // The save failed.
        // error is a Parse.Error with an error code and message.
      }
    });
}

function joinGame() {

    var pass_given = encodeHTML(document.getElementById("game-pass").value);

    var Game = Parse.Object.extend("Games");
    var query = new Parse.Query(Game);
    query.equalTo("password", pass_given);

    query.first({
      success: function(result) {
        //alert("Successfully retrieved an object");

        // Do something with the returned Parse.Object values
        if (result === undefined) {

          alert("Not a valid Game Code!");
        }
        
        else {

          currentUser.add("currentPlayer", result.id);
          currentUser.save();
          window.open('landing', "_self");
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
}

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function showNewGame(){
	$('#game-form').show();
	$('#join-game-form').hide();
}

function showJoinGame(){
	$('#game-form').hide();
	$('#join-game-form').show();
}

socket.on('goToLandingPage', function(data){
  console.log(data);
  var w = window.open('landing', "_self");
  w.opener.$('#asker').css('background-color', 'green');

});