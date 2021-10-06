/* Global Variables */

// Open Weather API Information
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="; // Base url using zip codes.
const key = "&appid=b3671da29b730a0a7b223abfec595c2b"; // API Key.
const unit = "&units=metric"; // Using Metric for this journal.
const postRoute = '/postWeather';
const getRoute = '/getWeather';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', () => {
    let zipcode = document.getElementById('zip').value; 
    const userResponse = document.getElementById('feelings').value;
    getWeather(baseURL+zipcode+key+unit). // Retrieve weather form OpenWeatherAPI
    then(function(weatherData) {
        console.log(weatherData);
        // In case of invalid zipcode
        if (weatherData.cod == 404) {alert("Invalid zipcode, cannot fetch weather information for provided zipcode."); return;}
        postWeather(postRoute, {temp: weatherData.main.temp, date: newDate, response: userResponse}) // Upload weather data to server
        .then(updateRecent({temp: weatherData.main.temp, date: newDate, response: userResponse})); // Update UI.
    });
})

async function getWeather(url){ // Retrieve weather form OpenWeatherAPI
    const res = await fetch(url);
    try {
        const weatherData = await res.json();
        //console.log(weatherData);
        return weatherData;
    } catch (e) {
        console.log("An error has occured fetching API weather data: " + e);
    }
}

async function postWeather(url, data = {}) { // Provide the server with the weather information through POST HTML route.
    const sendResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newWeather = await sendResponse.json();
        return newWeather;
    } catch (e) {
        console.log("An error has occured whilst posting weather data to server: " + e);
    }
}

async function getRecent(url){ // Get the data stored in the server.js file.
    const response = await fetch(url);
    try {
        const recentWeather = await response.json();
        updateRecent(recentWeather);
        return recentWeather;
    } catch (e){
        console.log("An error has occured whilst fetching recent weather: " + e);
    }
}

function updateRecent(data){ // Update UI Elements with the new entry information.
    document.getElementById('temp').innerHTML = `<strong>Temperature</strong>: ${data.temp}`;
    document.getElementById('date').innerHTML = `<strong>Date</strong>: ${data.date}`;
    document.getElementById('content').innerHTML = `<strong>Mood</strong>: ${data.response}`;
}

getRecent(getRoute);
