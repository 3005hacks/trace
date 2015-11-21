// function toggleID(element){
// 	$('#' + 'element').toggle();
// }

// function showSignin(){
// 	$('#signup-form').toggle();
// 	$('#signin-form').toggle();
// 	if($('#login-link').html() == "sign up"){
// 		$('#login-link').html("sign in");
// 	}
// 	else if($('#login-link').html() == "sign in"){
// 		$('#login-link').html("sign up");
// 	}	
// }

// $('#sign-in').click( function(){
// 	showSignin();
// });

var currentUser = Parse.User.current();

if (!currentUser) {

	window.open('index', "_self");
}

