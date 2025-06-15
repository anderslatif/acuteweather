export function displayWeatherWidget(weatherInfo, labelInfo) {
    updateWeatherInfo(weatherInfo, labelInfo);

    updateAxesValue("thermal", labelInfo.thermal.index, 7);
  	updateAxesValue("humidity", labelInfo.humidity.index, 6);
  	updateAxesValue("sun", labelInfo.sun.index, 4);

    
    
    document.getElementById("acute-weather-info-wrapper").style.display = "block";
}

export function updateWeatherInfo(weatherInfo, labelInfo) {
    document.getElementById("acuteweather-temperature-actual").textContent = `${weatherInfo.temperatureC}°C`;
    document.getElementById("acuteweather-temperature-outdoors").textContent = `${weatherInfo.feelsLikeOutdoors}°C`;
    document.getElementById("acuteweather-temperature-indoors").textContent = `${weatherInfo.feelsLikeIndoors}°C`;
    document.getElementById("acuteweather-label-sentence").textContent =  labelInfo.sentence;
}

export function updateAxesValue(axis, index, max) {
  		const fill = document.getElementById(axis + "-fill");
  		const percentage = (index + 1) / max * 100;
  		fill.style.width = percentage + "%";
}


