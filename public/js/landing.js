// function toggleID(element){
// 	$('#' + 'element').toggle();
// }
var topDawg;
var currentUser = Parse.User.current();


function isTopDawg() {

    var Game = Parse.Object.extend("Games");
    var query = new Parse.Query(Game);
    query.equalTo("topDawg", currentUser.getUsername());

    query.first({
          success: function(result) {
            console.log("Successfully retrieved an object");
            console.log(result === undefined);

            // Do something with the returned Parse.Object values
            if (result === undefined) {

                topDawg = false;
            }
            
            else {

              topDawg = true;
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
    });
}

function getMostRecentQuestion() {

    var Game = Parse.Object.extend("Games");
    var query = new Parse.Query(Game);
    query.descending("createdAt");

    query.first({
        success: function(result) {

            console.log("Successfully retrieved an object");
            $("#asker").html(result.get("topDawg") + " asked...");
            $("#question>.card-content").html(result.get("question"));
            $("#clue>.card-content").html(result.get("hint"));

        }, error: function(error) {

            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function getPostGuessesAndHints() {

    var Guess = Parse.Object.extend("Guesses");
    var Hint = Parse.Object.extend("Hints");


}

isTopDawg();
getMostRecentQuestion();




