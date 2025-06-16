export function generateFeelsLikeLabels({ feelsLikeOutdoors, dewPoint, solarRadiation }) {

	return {
		thermal: getClosestLabel(feelsLikeOutdoors	, [
			{ label: "freezing", max: 5 },
			{ label: "cold", max: 10 },
			{ label: "cool", max: 16 },
			{ label: "comfortable", max: 23 },
			{ label: "warm", max: 28 },
			{ label: "hot", max: 33 },
			{ label: "sweltering", max: 45 },
		]),
		humidity: getClosestLabel(dewPoint, [
			{ label: "dry", max: 10 },
			{ label: "crisp", max: 15 },
			{ label: "mild", max: 18 },
			{ label: "humid", max: 21 },
			{ label: "muggy", max: 24 },
			{ label: "oppressive", max: 30 },
		]),
		sun: getClosestLabel(solarRadiation, [
			{ label: "overcast", max: 100 },
			{ label: "dim", max: 300 },
			{ label: "bright", max: 600 },
			{ label: "blazing", max: 1200 },
		]),
		sentence: function () {
			return `It feels <b>${this.thermal.label}</b>, <b>${this.humidity.label}</b>, and <b>${this.sun.label}</b>.`;
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