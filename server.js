// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
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

app.get('getData', (req, res) => {
    res.send(projectData);
});

