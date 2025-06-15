export function displayWeatherWidget(weatherInfo, labelInfo) {
    updateWeatherInfo(weatherInfo);
    updateAxes(labelInfo);
    
    document.getElementById("acute-weather-info-wrapper").style.display = "block";
}

export function updateWeatherInfo(weatherInfo) {
    document.getElementById("acuteweather-temperature-actual").textContent = `${weatherInfo.temperatureC}°C`;
    document.getElementById("acuteweather-temperature-outdoors").textContent = `${weatherInfo.feelsLikeOutdoors}°C`;
    document.getElementById("acuteweather-temperature-indoors").textContent = `${weatherInfo.feelsLikeIndoors}°C`;
}

export function updateAxes(labelInfo) {

}