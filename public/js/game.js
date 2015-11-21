var currentUser = Parse.User.current();

function startGame() {

    var gamename_usr = encodeHTML(document.getElementById("new-gamename").value);
    var question_usr = encodeHTML(document.getElementById('new-question').value);
    var hint_usr = encodeHTML(document.getElementById("new-hint").value);

    var Game = Parse.Object.extend("Games");
    var game = new Game();

    game.save({
      gamename: gamename_usr,
      question: question_usr,
      hint: hint_usr
    }, {
      success: function(game) {
        // The object was saved successfully.
        alert("woohoo")
      },
      error: function(gameScore, error) {
        // The save failed.
        // error is a Parse.Error with an error code and message.
      }
    });
}



function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}