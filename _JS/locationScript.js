// JavaScript Document
let currentPage = 1;
const baseUrl = 'https://rickandmortyapi.com/api/location/';
let locationsPerPage = 20;
let searchQuery = '';
let totalLocations = 0;
let locationsData = [];
let hasMoreResults = true;

function fetchLocations(page = 1) {
    const offset = (page - 1) * locationsPerPage;
    const url = searchQuery
        ? `${baseUrl}?page=${page}&name=${searchQuery}`
        : `${baseUrl}?page=${page}`;

    if (!hasMoreResults) {
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalLocations = data.info.count;
            locationsPerPage = data.results.length;

            if (searchQuery && page === 1) {
                locationsData = data.results;
            } else {
                locationsData = locationsData.concat(data.results);
            }

            const currentLocations = locationsData.slice(offset, offset + locationsPerPage);
            displayLocations(currentLocations);
            currentPage = page;

            if (offset + locationsPerPage >= totalLocations) {
                hasMoreResults = false;
            }

            updatePaginationButtons();
        });
}

function updatePaginationButtons() {
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = !hasMoreResults;
}

function displayLocations(locations) {
    const container = document.getElementById('locations');
    container.innerHTML = '';
    locations.forEach(location => {
        const locationElement = document.createElement('div');
        locationElement.className = 'col-6 col-md-4 col-xl-3 mb-4';
        locationElement.innerHTML = `
            <div class="card h-100 bg-blue">
                <div class="card-body">
                    <h5 class="card-title">${location.name}</h5>
                    <p class="card-text">${location.type} - ${location.dimension}</p>
                </div>
            </div>`;
        container.appendChild(locationElement);
    });
}

document.getElementById('nextPage').addEventListener('click', () => {
    searchQuery = '';
    fetchLocations(currentPage + 1);
});

document.getElementById('prevPage').addEventListener('click', () => {
    searchQuery = '';
    if (currentPage > 1) {
        fetchLocations(currentPage - 1);
    }
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    searchQuery = e.target.value.toLowerCase();
    locationsData = [];
    hasMoreResults = true;
    fetchLocations(1);
});

// Cargar inicialmente
fetchLocations();
