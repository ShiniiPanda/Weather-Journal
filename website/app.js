/* Global Variables */

// Open Weather API Information
const baseURL = "api.openweathermap.org/data/2.5/weather?zip="; // Base url using zip codes.
const key = "&appid=b3671da29b730a0a7b223abfec595c2b"; // API Key.
const unit = "&units=metric"; // Using Metric for this journal.


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

async function getWeather(url){
    const res = await fetch(url);
    try {
        const weatherData = res.json();
        console.log(weatherData);
    } catch (e) {
        console.log("An error has occured: " + e);
    }
}