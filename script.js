const API_URL =
  "https://countries.dev/countries?fields=name,capital,region,population,flag&sort=name";

const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const statusElement = document.getElementById("status");
const countriesContainer = document.getElementById("countries-container");

async function getCountries() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failted to fetch countries");
    }

    const countries = await response.json();

    console.log(countries);
    console.log(countries[0]);

    statusElement.textContent = `${countries.length} countries loaded`;
  } catch (error) {
    console.log("Error:", error);
    statusElement.textContent = "Unable to load countries.";
  }
}

getCountries();
