export function displayWeatherWidget(weatherInfo, labelInfo) {
	updateWeatherInfo(weatherInfo, labelInfo);
    
    updateAxesValue("thermal", labelInfo.thermal.value, -10, 40);
	updateAxesValue("humidity", labelInfo.humidity.value, 0, 30);
	updateAxesValue("sun", labelInfo.sun.value, 0, 800);


	document.getElementById("acute-weather-info-wrapper").style.display = "block";
}

function updateWeatherInfo(weatherInfo, labelInfo) {
	document.getElementById("acuteweather-temperature-actual").textContent = `${weatherInfo.temperatureC}°C`;
	document.getElementById("acuteweather-temperature-outdoors").textContent = `${weatherInfo.feelsLikeOutdoors}°C`;
	document.getElementById("acuteweather-temperature-indoors").textContent = `${weatherInfo.feelsLikeIndoors}°C`;
}

function updateAxesValue(axis, value, min, max) {
	const fill = document.getElementById(axis + "-fill");
	const clampedValue = Math.max(min, Math.min(max, value));
	const percentage = ((clampedValue - min) / (max - min)) * 100;
	fill.style.width = `${percentage}%`;

    createTooltip(fill, axis, clampedValue);
}

function createTooltip(fillElement, axis, value) {
	let tooltip = fillElement.querySelector(".tooltip");
	if (!tooltip) {
		tooltip = document.createElement("div");
		tooltip.className = "tooltip";
		fillElement.appendChild(tooltip);
	}
	tooltip.textContent = axis === "sun" ? `${value} W/m²` : `${value}°C`;
}