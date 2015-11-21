// function toggleID(element){
// 	$('#' + 'element').toggle();
// }
var topDawg;

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

function isTopDawg() {

    var currentUser = Parse.User.current();
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

    var query2 = new Parse.Query(Game);
    query2.descending("createdAt");

    query2.first({
          success: function(result) {

            console.log("Successfully retrieved an object");
            $("#asker").html(result.get("topDawg"));
            $("#asker>.card-content").html(result.get("question"));
            $("#clue>.card-content").html(result.get("hint"));
            },
          error: function(error) {

            alert("Error: " + error.code + " " + error.message);
          }
        });
}

isTopDawg();




