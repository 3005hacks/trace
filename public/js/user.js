/*
    Login, Signup, and Logout Functions
    These functions deal with user accounts.    
        
    

*/

//signs up a new user
    function newUser() {

        var user = new Parse.User();
        var username = encodeHTML($('#new-username').val());
        var password = encodeHTML($('#new-password').val());
        var confirm_password = encodeHTML($('#confirm-password').val());
        var email = encodeHTML($('#new-email').val());

        // error - catches space in username
        if(username.split(" ").length > 1){

            alert("No spaces are allowed in your username.");
            return;
        }

        // error - catches different passwords
        if(password != confirm_password){

            alert("Your passwords don't match.");
            return;
        }

        // Setting initial user properties
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.set("currentTopDawg", []);
        user.set("currentPlayer", []);

        // Parse function that creates user in Parse database
        user.signUp(null, {
          success: function(user) {

            // Open next page
            window.open('game_start', "_self");
          },

          error: function(user, error) {
            
            alert("please try again");

            // Sometimes a user creates a new account without knowing they are
            // already signed in, so this prevents this
            Parse.User.logOut();
          }
        })}
        
      
    // Logs in a new Parse user 
    function login(){
      
      Parse.User.logIn(encodeHTML($('#username').val()), encodeHTML($('#password').val()), {
      success: function(user) {

            // Open next window
            window.open("game_start", "_self");
        },
            error: function(user, error) {

            // Sometimes a user creates a new account without knowing they are
            // already signed in, so this prevents this
            alert("please try again");
            Parse.User.logOut();
        }

        })
    };

    //logs out the Parse user
    function logout(){
        Parse.User.logOut();
        window.open('/', "_self");
    }

    // Facebook logging in
    function logMeIn(){
        
          Parse.FacebookUtils.logIn(null, {
          success: function(user) {
            if (!user.existed()) {
              alert("User signed up and logged in through Facebook!");
            } else {
              alert("User logged in through Facebook!");
            }
          },
          error: function(user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
          }

        });
        }
    
    function fb_login(){
        logMeIn();
        window.open('game_start', "_self");
    }

$(document).ready(function(){
    $("#password").keyup(function(e){
        if (e.which === 13){
            login();
        }
    })

    $("#new-email").keyup(function(e){
        if (e.which === 13){
            newUser();
        }
    })

});

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}