// JavaScript Document
let currentPage = 1;
const baseUrl = 'https://rickandmortyapi.com/api/episode/';
let episodesPerPage = 20;
let searchQuery = '';
let totalEpisodes = 0;
let episodesData = [];
let hasMoreResults = true;

function fetchEpisodes(page = 1) {
    const offset = (page - 1) * episodesPerPage;
    const url = searchQuery
        ? `${baseUrl}?page=${page}&name=${searchQuery}`
        : `${baseUrl}?page=${page}`;

    if (!hasMoreResults) {
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalEpisodes = data.info.count;
            episodesPerPage = data.results.length;

            if (searchQuery && page === 1) {
                episodesData = data.results;
            } else {
                episodesData = episodesData.concat(data.results);
            }

            const currentEpisodes = episodesData.slice(offset, offset + episodesPerPage);
            displayEpisodes(currentEpisodes);
            currentPage = page;

            if (offset + episodesPerPage >= totalEpisodes) {
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

function displayEpisodes(episodes) {
    const container = document.getElementById('episodes');
    container.innerHTML = '';
    episodes.forEach(episode => {
        const episodeElement = document.createElement('div');
        episodeElement.className = 'col-6 col-md-4 col-xl-3 mb-4';

        episodeElement.innerHTML = `
            <div class="card h-100 bg-blue">
                <div class="card-body">
                    <h5 class="card-title">${episode.name}</h5>
                    <p class="card-text">Fecha de emisión: ${episode.air_date}</p>
                    <p class="card-text">Código: ${episode.episode}</p>
                </div>
            </div>`;
        container.appendChild(episodeElement);
    });
}

document.getElementById('nextPage').addEventListener('click', () => {
    searchQuery = '';
    fetchEpisodes(currentPage + 1);
});

document.getElementById('prevPage').addEventListener('click', () => {
    searchQuery = '';
    if (currentPage > 1) {
        fetchEpisodes(currentPage - 1);
    }
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    searchQuery = e.target.value.toLowerCase();
    episodesData = [];
    hasMoreResults = true;
    fetchEpisodes(1);
});

// Cargar inicialmente
fetchEpisodes();
