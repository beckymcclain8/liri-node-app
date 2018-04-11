require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var data = process.argv[3];
var textToLog;

// A switch statement to call each function based on what the user types in the command line.
switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifyApi(data);
    break;

  case "movie-this":
    movie(data);
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

// This function brings up my last 5 Tweets
function myTweets() {
  var params = { Becky_Jones84: "nodejs" };
  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 5; i++) {
        // I created a variable to hold the information I wanted to console.log because it made it easier to append log.txt.
        textToLog = `
          -----------------------------------------------------------------------------
          ${tweets[i].text}
          `;

        fs.appendFile("log.txt", textToLog, "utf8", function (err) {
          if (err) {
            return console.log(err);
          }
        });
        console.log(textToLog);
      }
    }
  });
}

// This runs the Spotify function which makes a request to the Spotify API.
function spotifyApi(song) {
  if (song) {
    spotify.search({ type: "track", query: song }, function (err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      textToLog = `
        -----------------------------------------------------------------------------
        Artist: ${data.tracks.items[0].artists[0].name}
        Song Name:  ${data.tracks.items[0].name}
        Preview Link of the song: ${data.tracks.items[3].preview_url}
        Album Name: ${data.tracks.items[0].album.name}
        `;

      console.log(textToLog);

      fs.appendFile("log.txt", textToLog, "utf8", function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  } else {
    //if no song is provided it will default to "Shake it Off" by Taylor Swift.
    spotify.search({ type: "track", query: "Shake+it+off" }, function (err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      textToLog = `
        -----------------------------------------------------------------------------
        Artist: ${data.tracks.items[0].artists[0].name}
        Song Name:  ${data.tracks.items[0].name}
        Preview Link of the song: ${data.tracks.items[3].preview_url}
        Album Name: ${data.tracks.items[0].album.name}
        `;

      console.log(textToLog);
      
      fs.appendFile("log.txt", textToLog, "utf8", function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  }
}

// This calls the movie function which makes a request to the OMDB API.
function movie(movie) {
  if (movie) {
    request(
      "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy",
      function (error, response, body) {
        if (!error && response.statusCode === 200) {

          textToLog = `
            -----------------------------------------------------------------------------
            Title: ${JSON.parse(body).Title}
            Year:  ${JSON.parse(body).Year}
            IMDB Rating: ${JSON.parse(body).imdbRating}
            Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
            Production Country: ${JSON.parse(body).Country}
            Language: ${JSON.parse(body).Language}
            Plot: ${JSON.parse(body).Plot}
            Actors: ${JSON.parse(body).Actors}
            `;

          console.log(textToLog);

          fs.appendFile("log.txt", textToLog, "utf8", function (err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      }
    );
  } else {
    request(
      "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy",
      function (error, response, body) {
        if (!error && response.statusCode === 200) {

          textToLog = `
              -----------------------------------------------------------------------------
              Title: ${JSON.parse(body).Title}
              Year:  ${JSON.parse(body).Year}
              IMDB Rating: ${JSON.parse(body).imdbRating}
              Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
              Production Country: ${JSON.parse(body).Country}
              Language: ${JSON.parse(body).Language}
              Plot: ${JSON.parse(body).Plot}
              Actors: ${JSON.parse(body).Actors}
              `;

          console.log(textToLog);

          fs.appendFile("log.txt", textToLog, "utf8", function (err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      }
    );
  }
}

// This function reads what is written in random.txt and uses that information to make a request by calling a specific function.
function doWhatItSays() {
  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function (error, info) {
    if (error) {
      return console.log(error);
    }
    // I created a variable so that I could split the info inside random.txt and hold it in an array so that I can grab the information I need.
    var randomInfo = info.split(',');

    //randomInfo{1} refers tot he name of the song I want to run the function with.
    spotifyApi(randomInfo[1]);

    textToLog = `
    ----------------------------------------------------------------------------
    ${randomInfo[1]}
    `;

    fs.appendFile("log.txt", textToLog, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
}