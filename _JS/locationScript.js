// JavaScript Document
let currentPage = 1;
const baseUrl = 'https://rickandmortyapi.com/api/location/';

function fetchLocations(page = 1) {
    fetch(`${baseUrl}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            displayLocations(data.results);
            currentPage = data.info.next ? page : page - 1;
        });
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
    fetchLocations(currentPage + 1);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        fetchLocations(currentPage - 1);
    }
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    fetch(`${baseUrl}?name=${searchTerm}`)
        .then(response => response.json())
        .then(data => displayLocations(data.results))
        .catch(() => displayLocations([]));
});

// Initial fetch
fetchLocations();
