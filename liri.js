//8
require("dotenv").config();

//9
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//10
function myTweets(){
    //show last 20 tweets and when they were created in terminal
}

function spotify(){
    //artist
    //song name
    //preview link of the song from spotify
    //the album it's from
    //if no song is provided it will default to "the sign by Ace of Base"
}

function movie(){
    //    * Title of the movie.
    //    * Year the movie came out.
    //    * IMDB Rating of the movie.
    //    * Rotten Tomatoes Rating of the movie.
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.

    // If the suer doesn't type in a movie it will output the data for Mr. Nobody
}

function WhatItSays(){
    //In addition to loggin the data in Bash, output data to a .txt file called log.txt
    //Make sure to append each command to the log.txt file
    //don't overwrite each command
}