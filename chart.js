const ctx = document.getElementById("doughnut");
new Chart(ctx, {
	type: "doughnut",
	data: {
		labels: ["Matching", "Non-matching"],
		datasets: [
			{
				label: "# of TVSHows",
				data: [250, 0],
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});
