export function generateFeelsLikeLabels({ feelsLikeC, dewPointC, solarRadiation }) {
	const thermal = getThermalLabel(feelsLikeC);
	const humidity = getHumidityLabel(dewPointC);
	const sun = getSunLabel(solarRadiation);

	return {
		thermal: { label: thermal.label, index: thermal.index },
		humidity: { label: humidity.label, index: humidity.index },
		sun: { label: sun.label, index: sun.index },
		sentence: `It feels ${thermal.label} with ${humidity.label} humidity and ${sun.label} sunlight.`,
	};
}

function getSunLabel(radiation) {
	if (radiation < 100) return { label: "overcast", index: 0 };
	if (radiation < 300) return { label: "filtered sun", index: 1 };
	if (radiation < 600) return { label: "sunny", index: 2 };
	return { label: "blazing sun", index: 3 };
}

function getHumidityLabel(dewPointC) {
	if (dewPointC <= 10) return { label: "dry", index: 0 };
	if (dewPointC <= 15) return { label: "crisp", index: 1 };
	if (dewPointC <= 18) return { label: "neutral", index: 2 };
	if (dewPointC <= 21) return { label: "humid", index: 3 };
	if (dewPointC <= 24) return { label: "muggy", index: 4 };
	return { label: "sweaty mess", index: 5 };
}

function getThermalLabel(feelsLikeC) {
	if (feelsLikeC <= 5) return { label: "freezing", index: 0 };
	if (feelsLikeC <= 10) return { label: "cold", index: 1 };
	if (feelsLikeC <= 16) return { label: "cool", index: 2 };
	if (feelsLikeC <= 23) return { label: "comfortable", index: 3 };
	if (feelsLikeC <= 28) return { label: "warm", index: 4 };
	if (feelsLikeC <= 33) return { label: "hot", index: 5 };
	return { label: "sweltering", index: 6 };
}