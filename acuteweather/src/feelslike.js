export function computeFeelsLike({
	temperatureC,
	relativeHumidity,
	windSpeedMps,
	solarRadiation,
	precipitationMmPerHr
}) {
	const T = temperatureC;
	const RH = relativeHumidity;
	const v = windSpeedMps;
	const R = solarRadiation;
	const P = precipitationMmPerHr;

	const vaporPressure = (RH / 100) * 6.105 * Math.exp((17.27 * T) / (237.7 + T));

	const sunBoostOutdoor = Math.min(3, Math.log(1 + R) * 0.4);
	const rainPenaltyOutdoor = Math.min(1.5, P * 0.3);
	const feelsLikeOutdoorsPrecise = T + 0.33 * vaporPressure - 0.70 * v - 4.00 + sunBoostOutdoor - rainPenaltyOutdoor;
	const feelsLikeOutdoors = feelsLikeOutdoorsPrecise.toFixed(1);

	const sunBoostIndoor = 0;
	const rainPenaltyIndoor = 0;
	const feelsLikeIndoorsPrecise = T + 0.33 * vaporPressure - 0.70 * 0 - 4.00 + sunBoostIndoor - rainPenaltyIndoor;
	const feelsLikeIndoors = feelsLikeIndoorsPrecise.toFixed(1);

	return {
		T,
		RH,
		v,
		R,
		P,
		
		vaporPressure,
		sunBoostOutdoor,
		rainPenaltyOutdoor,
		sunBoostIndoor,
		rainPenaltyIndoor,

		feelsLikeOutdoors,
		feelsLikeOutdoorsPrecise,
		feelsLikeIndoors,
		feelsLikeIndoorsPrecise
	};
}
