// JavaScript Document
let currentPage = 1;
const baseUrl = 'https://rickandmortyapi.com/api/episode/';

function fetchEpisodes(page = 1) {
    fetch(`${baseUrl}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            displayEpisodes(data.results);
            currentPage = data.info.next ? page : page - 1;
        });
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
    fetchEpisodes(currentPage + 1);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        fetchEpisodes(currentPage - 1);
    }
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    fetch(`${baseUrl}?name=${searchTerm}`)
        .then(response => response.json())
        .then(data => displayEpisodes(data.results))
        .catch(() => displayEpisodes([]));
});

// Initial fetch
fetchEpisodes();
