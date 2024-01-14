// JavaScript Document
let currentPage = 1;
const baseUrl = 'https://rickandmortyapi.com/api/character/';
let charactersPerPage = 20;
let searchQuery = '';
let totalCharacters = 0;
let additionalResults = true;

function fetchCharacters(page = 1) {
    const offset = (page - 1) * charactersPerPage;
    const url = searchQuery
        ? `${baseUrl}?page=${page}&name=${searchQuery}`
        : `${baseUrl}?page=${page}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalCharacters = data.info.count;
            charactersPerPage = data.results.length;
            displayCharacters(data.results);
            currentPage = page;
            updatePaginationButtons();
        });
}

function updatePaginationButtons() {
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * charactersPerPage >= totalCharacters || !additionalResults;
}

function displayCharacters(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.className = 'col-6 col-md-4 col-xl-3 mb-4';

        characterElement.innerHTML = `
            <div class="card h-100 bg-blue">
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h4 class="card-title">${character.name}</h4>
                    <p class="card-text">Especie: ${character.species}</p>
                </div>
            </div>`;
        container.appendChild(characterElement);
    });
}

document.getElementById('nextPage').addEventListener('click', () => {
    additionalResults = false;
    fetchCharacters(currentPage + 1);
});

document.getElementById('prevPage').addEventListener('click', () => {
    additionalResults = false;
    if (currentPage > 1) {
        fetchCharacters(currentPage - 1);
    }
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    searchQuery = e.target.value.toLowerCase();
    additionalResults = true;
    fetchCharacters(1);
});

// Cargar inicialmente
fetchCharacters();
