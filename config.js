const config = {
	levels: [{},
		{
			number: 1,
			customers: [
				["builder", "#ffffff"],
				["builder", "#000000"],
				["builder", "#808080"],
			]
		}, 
		{
			number: 2,
			customers: [
				["builder", "#808080"],
				["builder", "#555555"],
				["builder", "#aaaaaa"]
			]
		},
		{
			number: 3,
			customers: [
				["builder", "#808080", "#555555", "#aaaaaa"],
				["painter", "random"],
				["builder", "random"]
			]
		}
	],
	dyePerLevel: [
		["Red", 3]
	],
	customers: {
		builder: {
			time: 12,
			dyeMaxCount: 2,
			pay: 5,
			diffMax: 120
		},
		painter: {
			time: 25,
			dyeMaxCount: 3,
			pay: 12,
			diffMax: 40
		}
	}
}