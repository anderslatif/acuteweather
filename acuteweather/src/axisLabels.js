function generateFeelsLikeLabel(feelsLikeC, dewPointC, solarRadiation) {
	const thermal = getThermalLabel(feelsLikeC);
	const humidity = getHumidityLabel(dewPointC);
	const sun = getSunLabel(solarRadiation);
	return `${thermal}, ${humidity}, ${sun}`;
}

function getSunLabel(radiation) {
	if (radiation < 100) return "overcast";
	if (radiation < 300) return "filtered sun";
	if (radiation < 600) return "sunny";
	return "blazing sun";
}

function getHumidityLabel(dewPointC) {
	if (dewPointC <= 10) return "dry";
	if (dewPointC <= 15) return "crisp";
	if (dewPointC <= 18) return "neutral";
	if (dewPointC <= 21) return "humid";
	if (dewPointC <= 24) return "muggy";
	return "sweaty mess";
}

function getThermalLabel(feelsLikeC) {
	if (feelsLikeC <= 5) return "freezing";
	if (feelsLikeC <= 10) return "cold";
	if (feelsLikeC <= 16) return "cool";
	if (feelsLikeC <= 23) return "comfortable";
	if (feelsLikeC <= 28) return "warm";
	if (feelsLikeC <= 33) return "hot";
	return "sweltering";
}