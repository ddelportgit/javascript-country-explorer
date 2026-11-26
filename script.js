const API_URL =
  "https://countries.dev/countries?fields=name,capital,region,population,flag&sort=name";

const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const statusElement = document.getElementById("status");
const countriesContainer = document.getElementById("countries-container");

let countries = [];

async function getCountries() {
  try {
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

    card.appendChild(name);
    card.appendChild(capital);
    card.appendChild(region);
    card.appendChild(population);

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

    return matchesSearch && matchesRegion;
  });

  displayCountries(filteredCountries);
}

searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);

getCountries();
