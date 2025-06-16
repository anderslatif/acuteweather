import './style.css';
import './animations.css';
import { getUserGestureIfNeeded } from './iOS.js';
import { getLocation } from './location.js';
import { getWeatherInfo } from './weatherAPI.js';
import { computeFeelsLike } from './feelslike.js';
import { generateFeelsLikeLabels } from './axisLabels.js';
import { displayWeatherWidget } from './domHandlers.js';

document.addEventListener('DOMContentLoaded', async () => {
    await getUserGestureIfNeeded();

    const location = await getLocation();

    let weatherInfo = await getWeatherInfo(location);
    console.log('Weather Info:', weatherInfo);

    if (!weatherInfo.temperatureC) {
        alert("The weather API returned a valid response but without the necessary data.");
        return;
    }

    const feelsLike = computeFeelsLike(weatherInfo);;
    weatherInfo = { ...weatherInfo, ...feelsLike };
    console.log('Feels Like Temperature:', feelsLike);  


    const labelInfo = generateFeelsLikeLabels(weatherInfo);
    console.log('Label Info:', labelInfo);

    displayWeatherWidget(weatherInfo, labelInfo);
});


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