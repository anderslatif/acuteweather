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
	const i = getCurrentHourIndexBasedOnClientTime(data.hourly.time);

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

function getCurrentHourIndexBasedOnClientTime(hourlyTimestamps, timezone) {
	const date = new Date();

	const fmt = new Intl.DateTimeFormat("default", {
		timeZone: timezone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		hour12: false
	});

	const parts = Object.fromEntries(fmt.formatToParts(date).map((part) => [part.type, part.value]));
	const localHour = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}`;
	
	return hourlyTimestamps.findIndex((time) => time.slice(0, 13) === localHour);
}