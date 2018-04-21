//initialization
var nodeArgs = process.argv;
var command = nodeArgs[2];

//song or movie names
var nameToFind = "";
for (i=3; i<nodeArgs.length; i++){
    if(i>3 && i<nodeArgs.length ){
        nameToFind += "+" + nodeArgs[i];
    } else {
        nameToFind += nodeArgs[i];
    }
}


var fs = require("fs");

//how to deal with api keys (option 3): use external file "keys.js" and ".env"
require('dotenv').config();
var keys = require("./keys.js");
var Twitter = require('twitter'); 
var twitterClient = new Twitter(keys.twitterKeys);

var Spotify = require('node-spotify-api');
var spotifyClient = new Spotify(keys.spotifyKeys);

var request = require("request");


function selectTask(commmand, nameToFind){
    switch(command){
        case "my-tweets":
            showTwit();
        break;
    
        case "spotify-this-song":
            if (nameToFind) {
                findSongs(nameToFind);
            } else {
                findSongs("The Sign");
            }
        break;
    
        case "movie-this":
            if (nameToFind) {
                findMovies(nameToFind);
            } else {
                findMovies("Mr. Nobody");
            }
        break;
    
        case "do-what-it-says":
            sayRandomly();
        break;

        default:
            console.log("Usage: node liri.js [my-tweets | spotify-this-song <sone name> | movie-this <movie name> | do-what-it-says]");
        break;
    }
}

function showTwit(){
    var params = {screen_name: 'BTS_twt'};
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    
        for (i = 19; i>=0; i--) {
            console.log("Tweet #" + (i + 1) + ": " + tweets[i].text + "\n\n");
            console.log("==============================================================");
            fs.appendFile("log.txt", tweets[i].text + "\n\n", function(err){
                if(err){
                    return console.log("cannot create log file");
                }
            });

            fs.appendFile("log.txt", "==============================================================\n\n", function(err){
                if(err){
                    return console.log("cannot create log file");
                }
            });

        }
    } else {
        console.log(error);
    }
    });
}

function findSongs(nameToFind) {

    spotifyClient.search({ type: 'track', query: nameToFind  }, function(error, data) {
        if (!error) {
            // save JSON file
            //fs.writeFileSync("Music.json",JSON.stringify(data));

            for(var i=0; i<data.tracks.items.length; i++){
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song:" + songData.name);
                //spotify preview link
                console.log("Preview URL:" + songData.preview_url);
                //album name
                console.log("Album:" + songData.album.name);
                console.log("======================================================");

                var info = "Song Title:     " + songData.name + "\n" +
                           "Artist:        " + songData.artists[0].name + '\n' +
                           "Album:         " + songData.album.name + '\n' +
                           "Preview URL:   " + songData.preview_url + '\n\n\n';

                fs.appendFile("log.txt", info, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
            
        } else {
            return console.log(error);
        }
       
      
      });

}


function findMovies(nameToFind) {
    //todo
    var queryURL = "https://www.omdbapi.com/?t=" + nameToFind + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request (queryURL, function (err, response, body){
        if(!err && response.statusCode == 200) {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdb Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);

            //adds text to log.text
            var info = "Title: " + body.Title + "\n" +
                       "Release Year: " + body.Year + "\n" +
                       "IMdb Rating: " + body.imdbRating + "\n" +
                       "Country: " + body.Country + "\n" +
                       "Language: " + body.Language + "\n" +
                       "Plot: " + body.Plot + "\n" +
                       "Actors: " + body.Actors + "\n" +
                       "Rotten Tomatoes Rating: " + body.tomatoRating + "\n" +
                       "Rotten Tomatoes URL: " + body.tomatoURL + "\n\n\n" ;

            fs.appendFile("log.txt", info, function(err) {
                if (err) {
                    console.log(err);
                }
            });

            //save JSON file
            //fs.writeFileSync("Movie.json",JSON.stringify(body));
        } else {
            console.log(err);
        }
    })
}

function sayRandomly() {
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err) {
            console.log(err);
        } else {
            var query = data.split(',')
            if (query[0] === "my-tweets") {
                showTwit();
            } else if( query[0] === "spotify-this-song" ) {
                findSongs(query[1]);
            } else if (query[0] === "movie-this"){
                findMovies(query[1]);
            } else {
                return console.log("I don't know what to do")
            }   
        }
    })
}

selectTask(command,nameToFind);






