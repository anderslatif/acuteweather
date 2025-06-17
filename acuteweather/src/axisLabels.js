export function generateFeelsLikeLabels({ feelsLikeOutdoors, dewPoint, solarRadiation }) {

	return {
		thermal: getClosestLabel(feelsLikeOutdoors, [
			{ label: "freezing", max: 0 },
			{ label: "cold", max: 8 },
			{ label: "cool", max: 15 },
			{ label: "comfortable", max: 22 },
			{ label: "warm", max: 28 },
			{ label: "hot", max: 35 },
			{ label: "sweltering", max: 45 },
		]),
		humidity: getClosestLabel(dewPoint, [
			{ label: "dry", max: 6 },
			{ label: "crisp", max: 11 },
			{ label: "mild", max: 15 },
			{ label: "humid", max: 20 },
			{ label: "muggy", max: 25 },
			{ label: "oppressive", max: 30 },
		]),
		sun: getClosestLabel(solarRadiation, [
			{ label: "overcast", max: 120 },
			{ label: "dim", max: 300 },
			{ label: "bright", max: 600 },
			{ label: "blazing", max: 1200 },
		]),
		getSentence: function () {
			return `It feels <b>${this.thermal.label}</b>, <b>${this.humidity.label}</b> and is <b>${this.sun.label}</b>.`;
		},
	};
}

function getClosestLabel(value, ranges) {
	for (let i = 0; i < ranges.length; i++) {
		if (value <= ranges[i].max) {
			return { label: ranges[i].label, index: i, value };
		}
	}
}