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
	document.getElementById("acuteweather-temperature-outdoors").textContent = `${weatherInfo.feelsLikeOutdoors}°C`;
	document.getElementById("acuteweather-temperature-indoors").textContent = `${weatherInfo.feelsLikeIndoors}°C`;

	document.getElementById("acuteweather-label-sentence").innerHTML =  labelInfo.getSentence();
}

function displayFeelsLikeFormulas(feelsLike) {

	const outdoorParams = document.getElementById("outdoor-params");
	const indoorParams = document.getElementById("indoor-params");

	outdoorParams.innerHTML = "";
	indoorParams.innerHTML = "";

	[
		["T", `${feelsLike.T} ← air temperature (°C)`],
		["RH", `${feelsLike.RH} ← relative humidity (%)`],
		["v", `${feelsLike.v.toFixed(2)} ← wind speed (m/s)`],
		["R", `${feelsLike.R.toFixed(1)} ← solar radiation (W/m²)`],
		["P", `${feelsLike.P.toFixed(2)} ← precipitation (mm/h)`],
		["D", `${feelsLike.D.toFixed(1)} ← dew point (°C)`],
		["dewPenalty", `${feelsLike.dewPenalty.toFixed(2)} ← dew point penalty (°C)`],
		["humidityDiscomfort", `${feelsLike.humidityDiscomfort.toFixed(2)} ← discomfort from humidity deviation (°C)`],
		["windChill", `${feelsLike.windChill?.toFixed(2) ?? "–"} ← wind chill (°C)`],
	].forEach(([label, value]) => {
		const li = document.createElement("li");
		li.innerHTML = `
			<span class="param-label param-${label}">${label}</span>
			<span class="param-arrow">=</span>
			<span class="param-value">${value}</span>
		`;
		outdoorParams.appendChild(li);
	});

	[
        ["T", `${feelsLike.T} ← air temperature (°C)`],
		["RH", `${feelsLike.RH} ← relative humidity (%)`],
		["e", `${feelsLike.vaporPressure.toFixed(2)} ← vapor pressure (hPa)`],
		["dewPenalty", `${feelsLike.dewPenalty.toFixed(2)} ← dew point penalty (°C)`],
		["humidityDiscomfort", `${feelsLike.humidityDiscomfort.toFixed(2)} ← discomfort from humidity deviation (°C)`],
		["windChill", `${feelsLike.windChill?.toFixed(2) ?? "–"} ← wind chill (°C). Will be shown as '-' if not applicable`],
	].forEach(([label, value]) => {
		const li = document.createElement("li");
		li.innerHTML = `
			<span class="param-label param-${label}">${label}</span>
			<span class="param-arrow">=</span>
			<span class="param-value">${value}</span>
		`;
		indoorParams.appendChild(li);
	});

	document.getElementById("vapor-pressure-value").textContent = feelsLike.vaporPressure.toFixed(2);
    document.getElementById("at-value").textContent = (feelsLike.T + 0.33 * feelsLike.vaporPressure - 0.70 * feelsLike.v).toFixed(2);
    // document.getElementById("dew-penalty-value").textContent = feelsLike.dewPenalty.toFixed(2);
    // document.getElementById("humidity-discomfort-value").textContent = feelsLike.humidityDiscomfort.toFixed(2);
    // document.getElementById("wind-chill-value").textContent = feelsLike.windChill ? feelsLike.windChill.toFixed(2) : "–";

    document.getElementById("outdoor-feelslike-value").textContent = feelsLike.feelsLikeOutdoorsPrecise.toFixed(4);
    document.getElementById("indoor-feelslike-value").textContent = feelsLike.feelsLikeIndoorsPrecise.toFixed(4);
	
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