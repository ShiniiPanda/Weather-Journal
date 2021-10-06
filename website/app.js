/* Global Variables */

// Open Weather API Information
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="; // Base url using zip codes.
const key = "&appid=b3671da29b730a0a7b223abfec595c2b"; // API Key.
const unit = "&units=metric"; // Using Metric for this journal.
const postRoute = '/postWeather';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', () => {
    let zipcode = document.getElementById('zip').value;
    let userResponse = document.getElementById('feelings').value;
    getWeather(baseURL+zipcode+key+unit).
    then(function(weatherData) {
        postWeather(postRoute, {temp: weatherData.main.temp, date: newDate, response: userResponse});
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
        return -1;
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