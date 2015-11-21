/*
    Login, Signup, and Logout Functions
    These functions deal with user accounts.    
        


*/
    //signs up a new user
    function newUser() {
        var user = new Parse.User();
        var username = encodeHTML(document.getElementById("new-username").value);
        var password = encodeHTML(document.getElementById('new-password').value);
        var confirm_password = encodeHTML(document.getElementById("confirm-password").value);
        var email = encodeHTML(document.getElementById('new-email').value);
        var access = encodeHTML(document.getElementById('access-code').value);
        var secret = "42BELOW";

        // error - catches space in username
        if(username.split(" ").length > 1){
            $(".error_login").html("No spaces are allowed in your username.");
            $(".error_login").show();
            return;
        }

        // error - catches different passwords
        if(password != confirm_password){
            $(".error_login").html("Your passwords don't match.");
            $(".error_login").show();
            return;
        }

        // error - catches incorrect access code
        if(access != secret){
            $(".error_login").html("That access code is incorrect.");
            $(".error_login").show();
            return;
        }

        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.set("squads", []);
        user.set("squadrons", []);
        //user.set("phone", document.getElementById('phone').text);

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            window.open('landing.html', "_self");
          },

          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            $(".error_login").html(error.message);
            $(".error_login").show();

          }
        })}
        
      
     //logs in a new Parse user 
    function login(){
      
      Parse.User.logIn(encodeHTML(document.getElementById('username').value), encodeHTML(document.getElementById('password').value), {
      success: function(user) {
        // Do stuff after successful login.
            window.open("landing.html", "_self");
        },
            error: function(user, error) {
        // The login failed. Check error to see why.
            $(".error_login").html(error.message);
            $(".error_login").show();
        }

        })
    };

    //logs out the Parse user
    function logout(){
        Parse.User.logOut();
        window.open('index.html', "_self");
    }

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
        window.open('landing.html', "_self");
    }

$(document).ready(function(){
    $("#password").keyup(function(e){
        if (e.which === 13){
            login();
        }
    })

    $("#new_password").keyup(function(e){
        if (e.which === 13){
            newUser();
        }
    })

    });

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}