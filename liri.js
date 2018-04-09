require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];

switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifyApi();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

//10
function myTweets() {
  var params = { Becky_Jones84: "nodejs" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      //add tweets and change the for loop to i < 20
      for (var i = 0; i < 5; i++) {
        console.log(tweets[i].text);
      }
    }
  });
}
function spotifyApi() {
  var spotifyInput = process.argv;
  var song = spotifyInput[3];
  if (song) {
    spotify.search({ type: "track", query: "'" + song + "'" }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      // console.log(JSON.stringify(data, null, 4));
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log(
        "Preview Link of the song: " + data.tracks.items[3].preview_url
      );
      console.log("Album Name: " + data.tracks.items[0].album.name);
    });
  } else {
    //if no song is provided it will default to "Shake it Off" by Taylor Swift
    spotify.search({ type: "track", query: "Shake+it+off" }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Preview Link of the song: " + data.tracks.items[3].preview_url);
      console.log("Album Name: " + data.tracks.items[0].album.name);
    });
  }
}

function movie() {
  var input = process.argv;
  var movie = input[3];

  if (movie) {
    request(
      "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(
            "-----------------------------------------------------------------------------"
          );
          // console.log("body: " + body);
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log(
            "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
          );
          console.log("Production Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("First Request");
        }
      }
    );
  } else {
    request(
      "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(
            "-----------------------------------------------------------------------------"
          );
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log(
            "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
          );
          console.log("Production Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
        }
      }
    );
  }
}

function doWhatItSays(){
  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(error, info) {
    // spotifyApi(info);
       

  // fs.appendFile("log.txt", "" function(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  // });
  });
}
//

//In addition to logging the data in Bash, output data to a .txt file called log.txt
//Make sure to append each command to the log.txt file
//don't overwrite each command
