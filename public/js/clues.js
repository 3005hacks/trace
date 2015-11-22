function makeGif(word, callback){ //returns a url for the gif

  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC&limit=5");
  xhr.done(function(data) { console.log("success got data", data); });

  q = word; // search query
  
  request = new XMLHttpRequest;
  request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
  
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      data = JSON.parse(request.responseText).data.image_url;
      console.log(data);
      callback(data);
    } else {
      console.log('reached giphy, but API returned an error');
     }
  };

  request.onerror = function() {
    console.log('connection error');
  };

  request.send();

}

function isGif(str){ //determines if a user input string is for a gif
	str = str.toLowerCase();
	var gif = "gif...";
	var gifShort = "gif..";
	var gifLong = "gif....";

	if(str.indexOf(gif.toLowerCase()) == 0){
		return true;
	}
	if(str.indexOf(gifShort.toLowerCase()) == 0){
		return true;
	}
	if(str.indexOf(gifLong.toLowerCase()) == 0){
		return true;
	}

	else{
		return false;
	}
}

function getGifWord(str){//turns a user input string into a word suitable for gif search
	var strArray;
	strArray = str.split("");

	strArray.splice(0,6);

	return strArray.join("");
}