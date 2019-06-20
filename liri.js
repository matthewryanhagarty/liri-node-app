require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
// var inquirer = require("inquirer");
var moment = require("moment");


var action = process.argv[2];

var movieName = "";
var artistName = "";
var userInput = process.argv;


if (action ===  "movie-this") {
    movieThis();
}

if (action === "concert-this") {
    concertThis();
}

function movieThis() {
    
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            movieName = movieName + "+" + userInput[i];
        } else if 
        (userInput[i] === "") {
            movieName === "Mr. Nobody";
        } else {
            movieName += userInput[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
            // console.log(response);
            console.log("Movie Name: " + response.data.Title + "\nYear of Release: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1] + "\nProduced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors)
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
        function(response) {
            // console.log(response);
            console.log("Next Venue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.region + "\nDate: " + moment(response.data[0].venue.datetime).format("LL"));
        }
    )


}


// inquirer.prompt([
//     {
//         type: "input",
//         name: "movie",
//         message: "Provide me with a movie,  my friend."
//     }
// ])
