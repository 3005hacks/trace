// function toggleID(element){
// 	$('#' + 'element').toggle();
// }
var topDawg;
var currentUser = Parse.User.current();
var gameObject;
var postList = [];

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

            console.log(result);
            gameObject = result;
            $("#asker").html(result.get("topDawg") + " asked...");
            $("#question>.card-content").html(result.get("question"));
            $("#clue>.card-content").html(result.get("hint"));
            //getPostGuessesAndHints();

        }, error: function(error) {

            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function getPostGuessesAndHints() {

    var guessRelation = gameObject.relation("guesses");
    var solveRelation = gameObject.relation("solves");

    guessRelation.query().find({

        success: function(list) {
            console.log(list);
            for (var i = 0; i < list.length; i++) {
                postList.push(list[0]);
            }
            solveRelation.query().find({

        success: function(list) {
            console.log(list);
            for (var i = 0; i < list.length; i++) {
                postList.push(list[0]);
            }
            for (var i = 0; i < postList.length; i++) {
                addToFeed(postList[i]);
            }
        }, error: function(error) {
            //place error here
        }
    });
        }, error: function(error) {
            //place error here
        }
    });

    // solveRelation.query().find({

    //     success: function(list) {
    //         console.log(list);
    //         for (var i = 0; i < list.length; i++) {
    //             postList.push(list[0]);
    //         }
    //         for (var i = 0; i < postList.length; i++) {
    //             addToFeed(postList[i]);
    //         }
    //     }, error: function(error) {
    //         //place error here
    //     }
    // });
    

    // postList = postList.sort(function(a, b) {

    //     if (a.createdAt < b.createdAt)
    //         return -1;
    //     if (a.createdAt > b.createdAt)
    //         return 1;
    //     return 0;
    // });
}

function addToFeed(post) {

    if (post.get("isGuess")) {

        var text = post.get("text");

        if (post.get("isGif")) {

            console.log(true);
            console.log(data);
            var cardContent = '<img style= "height: 18rem" class="gif" src="' + text + '">';
        }
        else {
            var cardContent = text;
        }
        $('#feed').append($(
            '\
            <div class = "card">\
                <div class = "lead-text">'+ post.get("username") +' guessed...</div>\
                <div class="card-content">' + cardContent + '</div>\
                <div class="vote-deck">\
                    <img id="thumbs-up-' + post.id + '" class="thumbs-up-guess" src="/img/thumb.png"> <img id="thumbs-down-' + post.id + '" class="thumbs-down-guess" src="/img/thumbdown.png">\
                </div>\
            </div>\
            '
        ));

        $('#thumbs-up-'+post.id).click(function(){
            // if (topDawg){
                socket.emit('topDawgThumbsUp', this.id);
                return false;
            // }
        });

        $('#thumbs-down-'+post.id).click(function(){
            // if (topDawg){
                socket.emit('topDawgThumbsDown', this.id);
                return false;
            // }
        });
    }
    else {

        $('#feed').append($(
            '\
            <div class = "card">\
                <div class = "lead-text">'+ post.get("username") + ' tried to answer with...</div>\
                <div class="card-content">' + post.get("text") + '</div>\
                <div class="vote-deck">\
                    <img id="thumbs-up-' + post.id + '" class="thumbs-up-solve" src="/img/thumb.png"> <img id="thumbs-down-' + post.id + '" class="thumbs-down-solve" src="/img/thumbdown.png">\
                </div>\
            </div>\
            '
        ));

        $('#thumbs-up-'+post.id).click(function(){
            // if (topDawg){
                socket.emit('solutionFound', this.id);
                return false;
            // }
        });

        $('#thumbs-down-'+post.id).click(function(){
            // if (topDawg){
                socket.emit('topDawgThumbsDown', this.id);
                return false;
            // }
        });
    }
}
isTopDawg();
getMostRecentQuestion();





