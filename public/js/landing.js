// function toggleID(element){
// 	$('#' + 'element').toggle();
// }

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

                return false;
            }
            
            else {

              return true;
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
}

var topDawg = isTopDawg();

