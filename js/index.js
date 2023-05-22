"use strict";

let tvShows;

class TVShow {
	constructor(title, year, image, crew, rating) {
		this.title = title;
		this.year = year;
		this.image = image;
		this.crew = crew;
		this.rating = rating;
	}
}

fetch("https://dev2-cors.onrender.com/https://imdb-api.com/en/API/Top250TVs/k_w1054dsk")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		tvShows = data.items.map((tvShow) => {
			return new TVShow(tvShow.title, tvShow.year, tvShow.image, tvShow.crew, tvShow.rank);
		});

		shuffle(tvShows);

		tvShows.forEach((tvShow) => {
			displayTVShow(tvShow);
		});

		document.querySelector(".button-value-1").addEventListener("click", () => shuffle(tvShows));
		document.querySelector(".button-value-2").addEventListener("click", () => sortByYear(tvShows));
		document.querySelector(".button-value-3").addEventListener("click", () => sortByRating(tvShows));
		document.querySelector(".button-value-4").addEventListener("click", () => sortAlphabetically(tvShows));
	})
	.catch((error) => {
		console.error("Error:", error);
	});

function clearProduct() {
	document.getElementById("product").innerHTML = "";
}

function appendToProduct(element) {
	document.getElementById("product").insertAdjacentHTML("beforeend", element);
}

function shuffleArray(array) {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

function shuffle(tvShows) {
	clearProduct();
	const shuffledArray = shuffleArray(tvShows);

	shuffledArray.forEach((tvShow) => {
		displayTVShow(tvShow);
	});
}

function sortByYear(tvShows) {
	clearProduct();
	const sortedArray = tvShows.sort((a, b) => b.year.localeCompare(a.year));

	sortedArray.forEach((tvShow) => {
		displayTVShow(tvShow);
	});
}

function sortByRating(tvShows) {
	clearProduct();
	const sortedArray = tvShows.sort((a, b) => a.rating - b.rating);

	sortedArray.forEach((tvShow) => {
		displayTVShow(tvShow);
	});
}

function sortAlphabetically(tvShows) {
	clearProduct();
	const sortedArray = tvShows.sort((a, b) => a.title.localeCompare(b.title));

	sortedArray.forEach((tvShow) => {
		displayTVShow(tvShow);
	});
}

function displayTVShow(tvShow) {
	const crew = `<h3>${tvShow.crew}</h3>`;
	const title = `<h1>${tvShow.title}</h1>`;
	const year = `<h2>${tvShow.year}</h2>`;
	const img = `<img src=${tvShow.image}/>`;

	appendToProduct(img);
	appendToProduct(title);
	appendToProduct(year);
	appendToProduct(crew);
}

document.getElementById("search").addEventListener("click", searchTVShow);

function searchTVShow() {
	clearProduct();
	const searchInput = document.getElementById("search-input").value.toLowerCase();
	const searchWords = searchInput.split(" ").filter((word) => word !== "");

	const matchingShows = tvShows.filter((tvShow) => {
		const titleWords = tvShow.title.toLowerCase().split(" ");
		return searchWords.every((searchWord) => titleWords.includes(searchWord));
	});

	const matchingCount = matchingShows.length;
	const nonMatchingCount = tvShows.length - matchingCount;

	updateChart(matchingCount, nonMatchingCount);

	matchingShows.forEach((tvShow) => {
		displayTVShow(tvShow);
	});
}

function updateChart(matchingCount, nonMatchingCount) {
	const chartData = [matchingCount, nonMatchingCount];

	const chart = Chart.getChart(ctx);
	if (chart) {
		chart.data.datasets[0].data = chartData;
		chart.update();
	}
}
