export function generateFeelsLikeLabels({ feelsLikeOutdoors, dewPoint, solarRadiation }) {

	return {
		thermal: getClosestLabel(feelsLikeOutdoors, [
			{ label: "freezing", max: 0 },
			{ label: "cold", max: 10 },
			{ label: "cool", max: 17 },
			{ label: "comfortable", max: 24 },
			{ label: "warm", max: 30 },
			{ label: "hot", max: 36 },
			{ label: "sweltering", max: 45 },
		]),
		humidity: getClosestLabel(dewPoint, [
			{ label: "dry", max: 7 },
			{ label: "crisp", max: 12 },
			{ label: "mild", max: 16 },
			{ label: "humid", max: 20 },
			{ label: "muggy", max: 25 },
			{ label: "oppressive", max: 30 },
		]),
		sun: getClosestLabel(solarRadiation, [
			{ label: "overcast", max: 150 },
			{ label: "dim", max: 350 },
			{ label: "bright", max: 650 },
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