function makeGif(word){

  q = word; // search query

  request = new XMLHttpRequest;
  request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
  
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      data = JSON.parse(request.responseText).data.image_url;
      console.log(data);
    } else {
      console.log('reached giphy, but API returned an error');
     }
  };
 
  request.onerror = function() {
    console.log('connection error');
  };
 
  request.send();

  return data;
}

function isGif(str){
	var strArray;
	strArray = str.split();

	if(strArray.slice(0,6) == "gif..."){
		return true;
	}

	else{
		return false;
	}
}