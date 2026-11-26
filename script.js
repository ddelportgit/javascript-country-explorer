const API_URL =
  "https://countries.dev/countries?fields=name,capital,region,population,flag&sort=name";

const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const statusElement = document.getElementById("status");
const countriesContainer = document.getElementById("countries-container");
const favouritesButton = document.getElementById("favourites-button");
const allCountriesButton = document.getElementById("all-countries-button");

let countries = [];
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
let showFavoritesOnly = false;

async function getCountries() {
  try {
    statusElement.textContent = "Loading countries...";
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    countries = await response.json();

    displayCountries(countries);

    console.log(countries);
    console.log(countries[0]);

    statusElement.textContent = `${countries.length} countries loaded`;
  } catch (error) {
    console.log("Error:", error);
    statusElement.textContent = "Unable to load countries.";
  }
}

function displayCountries(countryList) {
  countriesContainer.innerHTML = "";

  if (countryList.length === 0) {
    countriesContainer.textContent = "No countries found.";
    return;
  }

  countryList.forEach(function (country) {
    const card = document.createElement("article");

    const name = document.createElement("h2");
    name.textContent = `${country.flag} ${country.name}`;

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital || "N/A"}`;

    const region = document.createElement("p");
    region.textContent = `Region: ${country.region}`;

    const population = document.createElement("p");
    population.textContent = `Population: ${country.population.toLocaleString()}`;

    const favouriteButton = document.createElement("button");
    favouriteButton.textContent = favourites.includes(country.name)
      ? "Added!"
      : "Add to Favourites";

    favouriteButton.addEventListener("click", function () {
      if (favourites.includes(country.name)) {
        return;
      }

      favourites.push(country.name);

      localStorage.setItem("favourites", JSON.stringify(favourites));

      favouriteButton.textContent = "Added!";
    });

    card.appendChild(name);
    card.appendChild(capital);
    card.appendChild(region);
    card.appendChild(population);
    card.appendChild(favouriteButton);

    countriesContainer.appendChild(card);
  });
}

function filterCountries() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedRegion = regionFilter.value;

  const filteredCountries = countries.filter(function (country) {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm);

    const matchesRegion =
      selectedRegion === "" || country.region === selectedRegion;

    const matchesFavourite =
      !showFavoritesOnly || favourites.includes(country.name);

    return matchesSearch && matchesRegion && matchesFavourite;
  });

  displayCountries(filteredCountries);
  statusElement.textContent = `${filteredCountries.length} countries found`;
}

searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);
favouritesButton.addEventListener("click", function () {
  showFavoritesOnly = true;
  filterCountries(true);
});
allCountriesButton.addEventListener("click", function () {
  showFavoritesOnly = false;
  searchInput.value = "";
  regionFilter.value = "";
  filterCountries();
});

getCountries();
