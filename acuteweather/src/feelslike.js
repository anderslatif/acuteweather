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

	// Used by both
	const vaporPressure = (RH / 100) * 6.105 * Math.exp((17.27 * T) / (237.7 + T));
	const dewPenalty = Math.max(0, D - 16) * 0.2;
	const humidityDiscomfort = RH < 30 ? -(30 - RH) * 0.08 : RH > 60 ? (RH - 60) * 0.08 : 0;

	// Outdoor
	const sunBoostOutdoor = Math.min(3, Math.log(1 + R) * 0.4);
	const rainPenaltyOutdoor = Math.min(1.5, P * 0.3);
	const useWindChill = (T <= 10 && v >= 1.3);
	const windChill = useWindChill
		? 13.12 + 0.6215 * T - 11.37 * Math.pow(v, 0.16) + 0.3965 * T * Math.pow(v, 0.16)
		: T;
	const apparentTemperatureOutdoors = T
		+ 0.33 * vaporPressure
		- 0.7 * v
		- 4;
	const feelsLikeOutdoors = apparentTemperatureOutdoors
		+ sunBoostOutdoor
		- (T - windChill)
		- rainPenaltyOutdoor
		- dewPenalty
		+ humidityDiscomfort;

	// Indoor
	const baselineIndoors = T + Math.min(0.33 * vaporPressure, 4) - 2;
	const sunBoostIndoors = Math.min(2, Math.sqrt(R) * 0.05);
	const insulationFactor = 0.02;
	const indirectWindEffect = v * insulationFactor;
	const humidityDiscomfortIndoor = humidityDiscomfort * 0.5;

	const feelsLikeIndoors = baselineIndoors
		+ sunBoostIndoors
		- indirectWindEffect
		- dewPenalty
		- humidityDiscomfortIndoor;

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
		windChill,
		
		sunBoostOutdoor,
		rainPenaltyOutdoor,
		feelsLikeOutdoors,

		sunBoostIndoors,
		indirectWindEffect,
		baselineIndoors,
		feelsLikeIndoors,

	};
}