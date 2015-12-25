function slide2(){
	$("#howtoslide1").hide();
	$("#howtoslide2").toggle("slide", {direction: "down"}, 750);
}
function slide3(){
	$("#howtoslide2").hide();
	$("#howtoslide3").toggle("slide", {direction: "up"}, 750);
}
function slide4(){
	$("#howtoslide3").hide();
	$("#howtoslide4").toggle("slide", {direction: "down"}, 750);
}
function playNow(){
	$("body").animate({scrollTop: $("#signup-bar").position().top}, "slow");
	showSignup();
}
function showRules(){
	$("#howto").slideDown();
	$("body").animate({scrollTop: $("#howto-bar").position().top}, "slow");
}