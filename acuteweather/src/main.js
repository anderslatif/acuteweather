import './style.css';
import { getLocation } from './location.js';
import { getWeatherInfo } from './weatherAPI.js';
import { computeFeelsLike } from './feelslike.js';
import { generateFeelsLikeLabels } from './axisLabels.js';
import { displayWeatherWidget } from './domHandlers.js';

document.addEventListener('DOMContentLoaded', async () => {
  // todo hardcoding the location for now
  // const location = await getLocation();

  const location = {
      latitude: 51.5074,
      longitude: -0.1278,
      accuracy: null,
      fallback: true,
      elevation: 10,
  };

  /*
  let weatherInfo = await getWeatherInfo(location);
  console.log('Weather Info:', weatherInfo);

  const feelsLike = computeFeelsLike(weatherInfo);;
  console.log('Feels Like Temperature:', feelsLike);

  weatherInfo = { ...weatherInfo, ...feelsLike};
  */

  const weatherInfo = { 
    temperatureC: 20,
    feelsLikeOutdoors: 18,
    feelsLikeIndoors: 22,
    feelsLikeC: 19,
    dewPointC: 15,
    solarRadiation: 200,
    location: location
  };
  
  const labelInfo = generateFeelsLikeLabels(weatherInfo);
  
  displayWeatherWidget(weatherInfo, labelInfo)
});

