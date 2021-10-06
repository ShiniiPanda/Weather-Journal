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
    getWeather(baseURL+zipcode+key+unit).
    then(function(weatherData) {
        console.log(weatherData);
        if (weatherData.cod == 404) {alert("Invalid zipcode, cannot fetch weather information for provided zipcode."); return;}
        postWeather(postRoute, {temp: weatherData.main.temp, date: newDate, response: userResponse})
        .then(updateRecent({temp: weatherData.main.temp, date: newDate, response: userResponse}));
    });
})

async function getWeather(url){
    const res = await fetch(url);
    try {
        const weatherData = await res.json();
        //console.log(weatherData);
        return weatherData;
    } catch (e) {
        console.log("An error has occured: " + e);
    }
}

async function postWeather(url, data = {}) {
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
        console.log("An error has occured: " + e);
    }
}

async function getRecent(url){
    const response = await fetch(url);
    try {
        const recentWeather = await response.json();
        updateRecent(recentWeather);
        return recentWeather;
    } catch (e){
        console.log("An error has occured whilst fetching recent weather: " + e);
    }
}

function updateRecent(data){
    document.getElementById('temp').innerHTML = `<strong>Temperature</strong>: ${data.temp}`;
    document.getElementById('date').innerHTML = `<strong>Date</strong>: ${data.date}`;
    document.getElementById('content').innerHTML = `<strong>Mood</strong>: ${data.response}`;
}

getRecent(getRoute);
