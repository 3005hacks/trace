var currentUser = Parse.User.current();

if (!currentUser) {

    window.open('index', "_self");
}

function createGame() {

    var gamename_usr = encodeHTML(document.getElementById("new-gamename").value);
    var question_usr = encodeHTML(document.getElementById('new-question').value);
    var hint_usr = encodeHTML(document.getElementById("new-hint").value);

    var Game = Parse.Object.extend("Games");
    var game = new Game();

    game.save({
      gamename: gamename_usr,
      question: question_usr,
      hint: hint_usr,
      username: currentUser.getUsername()
    }, {
      success: function(game) {
        // The object was saved successfully.
        window.open('landing', "_self");
      },
      error: function(gameScore, error) {
        // The save failed.
        // error is a Parse.Error with an error code and message.
      }
    });

    currentUser.add("currentTopDawg", game.id);
}

function joinGame() {

    var gamename_usr = encodeHTML(document.getElementById("new-gamename").value);
    var question_usr = encodeHTML(document.getElementById('new-question').value);
    var hint_usr = encodeHTML(document.getElementById("new-hint").value);

    var Game = Parse.Object.extend("Games");
    var game = new Game();

    game.save({
      gamename: gamename_usr,
      question: question_usr,
      hint: hint_usr,
      username: currentUser.getUsername()
    }, {
      success: function(game) {
        // The object was saved successfully.
        window.open('landing', "_self");
      },
      error: function(gameScore, error) {
        // The save failed.
        // error is a Parse.Error with an error code and message.
      }
    });

    currentUser.add("currentTopDawg", game.id);
}




function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}