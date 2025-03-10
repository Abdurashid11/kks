const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

let allCountries = [];

async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        allCountries = await response.json();
        displayCountries(allCountries);
    } catch (error) {
        console.log("Error", error);
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = "";
    countries.forEach((country) => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        countriesContainer.appendChild(countryCard);
    });
}

function filterCountries() {
    const searchText = searchInput.value.toLowerCase();
    const selectedRegion = filterSelect.value;

    const filteredCountries = allCountries.filter(country => {
        const nameMatches = country.name.common.toLowerCase().includes(searchText);
        const regionMatches = selectedRegion ? country.region === selectedRegion : true;
        return nameMatches && regionMatches;
    });

    displayCountries(filteredCountries);
}

searchInput.addEventListener('input', filterCountries);
filterSelect.addEventListener('change', filterCountries);

fetchCountries();