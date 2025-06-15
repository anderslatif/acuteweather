export async function getWeatherInfo({ latitude, longitude }) {
	const url = new URL("https://api.open-meteo.com/v1/forecast");

	url.search = new URLSearchParams({
		latitude,
		longitude,
		hourly: [
			"temperature_2m",
			"relative_humidity_2m",
			"dew_point_2m",
			"wind_speed_10m",
			"precipitation",
			"shortwave_radiation"
		].join(","),
		current_weather: true,
		forecast_days: 1,
		timezone: "auto"
	});

	const response = await fetch(url);
	if (!response.ok) {
        alert(`Open-Meteo request failed: ${response.status} ${response.statusText}`);
        throw new Error(`Open-Meteo request failed: ${response}`);
    }

	const data = await response.json();
	const i = getCurrentHourIndex(data.hourly.time);

	return {
        ...data,
		temperatureC: data.hourly.temperature_2m[i],
		relativeHumidity: data.hourly.relative_humidity_2m[i],
		dewPoint: data.hourly.dew_point_2m[i],
		windSpeedMps: data.hourly.wind_speed_10m[i] / 3.6,
		solarRadiation: data.hourly.shortwave_radiation[i],
		precipitationMmPerHr: data.hourly.precipitation[i]
	};
}

function getCurrentHourIndex(hourlyTimestamps) {
	const now = new Date();
	const currentHour = now.toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
	return hourlyTimestamps.findIndex(t => t.startsWith(currentHour));
}