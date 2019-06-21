require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


var action = process.argv[2];

var movieName = "";
var artistName = "";
var spotifySong = "";
var userInput = process.argv;



if (action === "movie-this") {
    movieThis();
}

if (action === "concert-this") {
    concertThis();
}

if (action === "spotify-this-song") {
    spotifyThisSong(spotifySong);
}

if (action === "do-what-it-says") {
    doWhatItSays();
}

function movieThis() {
    if (!userInput[3]) {
        userInput[3] = "Mr. Nobody";
    }
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            movieName = movieName + "+" + userInput[i];
        } else {
            movieName += userInput[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            console.log("Movie Name: ", response.data.Title, "\nYear of Release: ", response.data.Year, "\nIMDB Rating: ", response.data.imdbRating, "\nRotten Tomatoes Rating: ", response.data.Ratings[1], "\nProduced in: ", response.data.Country, "\nLanguage: ", response.data.Language, "\nPlot: ", response.data.Plot, "\nActors: ", response.data.Actors)
        }
    )
}

function concertThis() {

    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            artistName = artistName + "+" + userInput[i];
        } else {
            artistName += userInput[i];
        }
    }

    queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            console.log("Next Venue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + "\nDate: " + moment(response.data[0].venue.datetime).format("LL"));
        }
    )
}

function spotifyThisSong(spotifySong) {


    if (!userInput[3]) {
        userInput[3] = "the sign ace of base";
    }

    var spotifySong = process.argv.slice(3).join(" ");

    spotify
        .search({ type: 'track', query: spotifySong })
        .then(function (response) {
            console.log(response.tracks.items[0].artists[0].name);
            console.log(response.tracks.items[0].name)
            console.log(response.tracks.items[0].album.name)
            console.log(response.tracks.items[0].album.external_urls.spotify)
        })
        .catch(function (err) {
            console.log(err);
        });
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var doIt = data.split(",")

        if (doIt[0] === "spotify-this-song") {

            spotifySong = doIt[1]

            spotify
                .search({ type: 'track', query: spotifySong })
                .then(function (response) {
                    console.log(response.tracks.items[0].artists[0].name);
                    console.log(response.tracks.items[0].name)
                    console.log(response.tracks.items[0].album.name)
                    console.log(response.tracks.items[0].album.external_urls.spotify)
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        if (doIt[0] === "movie-this") {

            movieName = doIt[1]

            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            axios.get(queryUrl).then(
                function (response) {
                    console.log("Movie Name: ", response.data.Title, "\nYear of Release: ", response.data.Year, "\nIMDB Rating: ", response.data.imdbRating, "\nRotten Tomatoes Rating: ", response.data.Ratings[1], "\nProduced in: ", response.data.Country, "\nLanguage: ", response.data.Language, "\nPlot: ", response.data.Plot, "\nActors: ", response.data.Actors)
                }
            )
        }

        if (doIt[0] === "concert-this") {

            artistName = doIt[1]

            queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

            axios.get(queryUrl).then(
                function (response) {
                    // console.log(response);
                    console.log("Next Venue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + "\nDate: " + moment(response.data[0].venue.datetime).format("LL"));
                }
            )

        }

    })

}

