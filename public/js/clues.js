// returns a url for the gif
function makeGif(word, callback){

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

// determines if a user input string is for a gif
function isGif(str){ 
	str = str.toString().toLowerCase();
	var gif = "gif/";

	if(str.indexOf(gif.toLowerCase()) == 0){
		return true;
	}
	else{
		return false;
	}
}

// turns a user input string into a word suitable for gif search
function getGifWord(str){
	var strArray;
	strArray = str.split("");

	strArray.splice(0,6);

	return strArray.join("");
}

// determines if a user input string is for a song
function isSong(str){ 
	str = str.toString().toLowerCase();
	var song = "song/";

	if(str.indexOf(song.toLowerCase()) == 0){
		return true;
	}
	else{
		return false;
	}
}

// turns a user input string into a word suitable for a song widget
function getSongWord(str){
	var strArray;
	strArray = str.split("");

	strArray.splice(0,5);

	return strArray.join("");
}

function makeSongWidget(str, callback){

	socket.emit('spotify', {'songName':str});

	socket.on('spotify2', function(songURI) {
		var song = "https://embed.spotify.com/?uri=" + songURI;
		callback(song);
	});
}
