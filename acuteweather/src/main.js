import './style.css';
import './animations.css';
import { getLocation } from './location.js';
import { getWeatherInfo } from './weatherAPI.js';
import { computeFeelsLike } from './feelslike.js';
import { generateFeelsLikeLabels } from './axisLabels.js';
import { displayWeatherWidget } from './domHandlers.js';

let weatherInfo;
let location; 

document.addEventListener('DOMContentLoaded', async () => {
    location = await getLocation();

    weatherInfo = await getWeatherInfo(location);
    console.log('Weather Info:', weatherInfo);

    if (!weatherInfo.temperatureC) {
        alert("The weather API returned a valid response but without the necessary data.");
        return;
    }

    updateWeatherDisplay();
});

function updateWeatherDisplay() {
    const feelsLike = computeFeelsLike(weatherInfo);;
    weatherInfo = { ...weatherInfo, ...feelsLike };
    console.log('Feels Like Temperature:', feelsLike);  


    const labelInfo = generateFeelsLikeLabels(weatherInfo);
    console.log('Label Info:', labelInfo);

    displayWeatherWidget(weatherInfo, labelInfo);
}

document.querySelectorAll('.formula-box').forEach((box) => {
    const toggle = box.querySelector('.formula-toggle');
    box.addEventListener('dblclick', () => {
        box.classList.toggle('collapsed');
    });
    toggle.addEventListener('dblclick', event => {
        event.stopPropagation();
        box.classList.toggle('collapsed');
    });
});

setInterval(async () => {
    const newWeatherInfo = await getWeatherInfo(location);
    if (newWeatherInfo.temperatureC !== weatherInfo.temperatureC ||
        newWeatherInfo.relativeHumidity !== weatherInfo.relativeHumidity ||
        newWeatherInfo.windSpeedMps !== weatherInfo.windSpeedMps ||
        newWeatherInfo.solarRadiation !== weatherInfo.solarRadiation ||
        newWeatherInfo.precipitationMmPerHr !== weatherInfo.precipitationMmPerHr) {
    
        updateWeatherDisplay();

    }

}, 10 * 60 * 1000);
