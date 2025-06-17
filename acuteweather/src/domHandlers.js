export function displayWeatherWidget(weatherInfo, labelInfo) {
	updateWeatherInfo(weatherInfo, labelInfo, labelInfo);
	displayFeelsLikeFormulas(weatherInfo);

    updateAxesValue("thermal", labelInfo.thermal.value, 0, 45);
	updateAxesValue("humidity", labelInfo.humidity.value, 0, 30);
	updateAxesValue("sun", labelInfo.sun.value, 0, 1200);

	document.getElementById("loader")?.remove();
	document.getElementById("acute-weather-info-wrapper").style.display = "block";
}

function updateWeatherInfo(weatherInfo, labelInfo) {
	document.getElementById("acuteweather-temperature-actual").textContent = `${weatherInfo.temperatureC}°C`;
	document.getElementById("acuteweather-temperature-outdoors").textContent = `${weatherInfo.feelsLikeOutdoors.toFixed(2)}°C`;
	document.getElementById("acuteweather-temperature-indoors").textContent = `${weatherInfo.feelsLikeIndoors.toFixed(2)}°C`;

	document.getElementById("acuteweather-label-sentence").innerHTML =  labelInfo.getSentence();
}

function displayFeelsLikeFormulas(feelsLike) {

	const outdoorParams = document.getElementById("outdoor-params");
	const indoorParams = document.getElementById("indoor-params");

	outdoorParams.innerHTML = "";
	indoorParams.innerHTML = "";

	[
		["T", feelsLike.T, "← air temperature (°C)"],
		["RH", feelsLike.RH, "← relative humidity (%)"],
		["v", feelsLike.v.toFixed(2), "← wind speed (m/s)"],
		["R", feelsLike.R.toFixed(1), "← solar radiation (W/m²)"],
		["P", feelsLike.P.toFixed(2), "← precipitation (mm/h)"],
		["D", feelsLike.D.toFixed(1), "← dew point (°C)"],
	].forEach(([label, actual, explanation]) => {
		const li = document.createElement("li");
		li.innerHTML = `
			<span class="param-label param-${label}">${label}</span>
			<span class="param-arrow">=</span>
			<span class="param-actual-value">${actual}</span>
			<span class="param-value">${explanation}</span>
		`;
		outdoorParams.appendChild(li);
	});

	[
        ["T", feelsLike.T, "← air temperature (°C)"],
		["RH", feelsLike.RH, "← relative humidity (%)"],
		["R", feelsLike.R.toFixed(1), "← solar radiation (W/m²)"],
		["D", feelsLike.D.toFixed(1), "← dew point (°C)"],

	].forEach(([label, actual, explanation]) => {
		const li = document.createElement("li");
		li.innerHTML = `
			<span class="param-label param-${label}">${label}</span>
			<span class="param-arrow">=</span>
			<span class="param-actual-value">${actual}</span>
			<span class="param-value">${explanation}</span>
		`;
		indoorParams.appendChild(li);
	});

	
    // Update all new formula value spans
    document.getElementById("vapor-pressure-value").textContent = feelsLike.vaporPressure.toFixed(2);
    document.getElementById("at-value").textContent = (feelsLike.T + 0.33 * feelsLike.vaporPressure - 0.70 * feelsLike.v).toFixed(2);
    document.getElementById("sunboost-value").textContent = feelsLike.sunBoostOutdoor.toFixed(2);
    document.getElementById("rainpenalty-value").textContent = feelsLike.rainPenaltyOutdoor.toFixed(2);
    document.getElementById("dewpenalty-value").textContent = feelsLike.dewPenalty.toFixed(2);
    document.getElementById("humiditydiscomfort-value").textContent = feelsLike.humidityDiscomfort.toFixed(2);
    document.getElementById("windchill-value").textContent = typeof feelsLike.windChill === "number" ? feelsLike.windChill.toFixed(2) : "–";
    document.getElementById("indoor-vapor-pressure-value").textContent = feelsLike.vaporPressure.toFixed(2);
    document.getElementById("indoor-dewpenalty-value").textContent = feelsLike.dewPenalty.toFixed(2);
    document.getElementById("indoor-humiditydiscomfort-value").textContent = feelsLike.humidityDiscomfort.toFixed(2);
    document.getElementById("indoor-sunboost-value").textContent = feelsLike.sunBoostIndoor.toFixed(2);
	document.getElementById("indoor-baseline-value").textContent = feelsLike.baselineIndoors.toFixed(2);

	document.getElementById("outdoor-feelslike-value").textContent = feelsLike.feelsLikeOutdoors.toFixed(4);
    document.getElementById("indoor-feelslike-value").textContent = feelsLike.feelsLikeIndoors.toFixed(4);
	
}


function updateAxesValue(axis, value, min, max) {
	const fill = document.getElementById(axis + "-fill");
	const clampedValue = Math.max(min, Math.min(max, value));
	const percentage = ((clampedValue - min) / (max - min)) * 100;
	fill.style.width = `${percentage}%`;

    createTooltip(fill, axis, clampedValue.toFixed(2));
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