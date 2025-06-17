export function computeFeelsLike({
	temperatureC,
	relativeHumidity,
	windSpeedMps,
	solarRadiation,
	precipitationMmPerHr,
	dewPoint,
	current_weather
}) {
	const T = temperatureC;
	const RH = relativeHumidity;
	const v = windSpeedMps;
	const R = solarRadiation;
	const P = precipitationMmPerHr;
	const D = dewPoint;
	const dayMultiplier = current_weather.is_day ? 1 : 0;

	const vaporPressure = (RH / 100) * 6.105 * Math.exp((17.27 * T) / (237.7 + T));
	const dewPenalty = Math.max(0, D - 16) * 0.2;
	const humidityDiscomfort = Math.abs(RH - 45) * 0.05;

	const sunBoostOutdoor = Math.min(6, (R / 100)) * dayMultiplier;
	const rainPenaltyOutdoor = Math.min(1.5, P * 0.3);
	const windChill = (T <= 10 && v >= 1.3)
		? 13.12 + 0.6215 * T - 11.37 * Math.pow(v, 0.16) + 0.3965 * T * Math.pow(v, 0.16)
		: null;
	const baseOutdoors = T + 0.33 * vaporPressure - 0.7 * v - 4;
	const feelsLikeOutdoorsPrecise = (windChill !== null ? windChill : baseOutdoors)
		+ sunBoostOutdoor - rainPenaltyOutdoor - dewPenalty - humidityDiscomfort;
	const feelsLikeOutdoors = feelsLikeOutdoorsPrecise.toFixed(1);

	const sunBoostIndoor = R * 0.1 * dayMultiplier;
	const insulationFactor = 0.1;
	const indirectWindEffect = v * insulationFactor;
	const feelsLikeIndoorsPrecise = T + 0.33 * vaporPressure - indirectWindEffect
		+ sunBoostIndoor - dewPenalty - humidityDiscomfort;
	const feelsLikeIndoors = feelsLikeIndoorsPrecise.toFixed(1);

	return {
		T,
		RH,
		v,
		R,
		P,
		D,
		
		vaporPressure,
		dewPenalty,
		humidityDiscomfort,
		sunBoostOutdoor,
		rainPenaltyOutdoor,
		sunBoostIndoor,

		feelsLikeOutdoors,
		feelsLikeOutdoorsPrecise,
		feelsLikeIndoors,
		feelsLikeIndoorsPrecise
	};
}