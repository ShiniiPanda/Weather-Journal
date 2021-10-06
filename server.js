// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // not used due to deprecation ,innate express functionalities has been included instead.
const fs = require('fs');
const mostRecent = require('./recentWeather.json'); // To read the latest journal entry enter by the user.
projectData = mostRecent;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express instead of body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, running);
function running() {
    console.log("Server is currently running on localhost:" + port);
}

// Get Route for projectData

app.get('/getWeather', (req, res) => {
    res.send(projectData);
});

// Post Route for ProjectData

app.post('/postWeather', (req, res) => {
    let fetchedData = req.body;
    projectData.temp = fetchedData.temp;
    projectData.date = fetchedData.date;
    projectData.response = fetchedData.response;
    fs.writeFile("./recentWeather.json", JSON.stringify(fetchedData), (e) => {  // This function saves the information to recentWeather.json, incase the server was closed and user wished to see their latest entry.
       if(e) console.log("Couldn't parse latest entry to json file " + e);
    })
    //console.log(fetchedData);
});