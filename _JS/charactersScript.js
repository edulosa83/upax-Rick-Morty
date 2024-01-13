// JavaScript Document
let currentPage = 1;
const baseUrl = 'https://rickandmortyapi.com/api/character/';

function fetchCharacters(page = 1) {
    fetch(`${baseUrl}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            displayCharacters(data.results);
            currentPage = data.info.next ? page : page - 1;
        });
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
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">Especie: ${character.species}</p>
                </div>
            </div>`;
        container.appendChild(characterElement);
    });
}

document.getElementById('nextPage').addEventListener('click', () => {
    fetchCharacters(currentPage + 1);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        fetchCharacters(currentPage - 1);
    }
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    fetch(`${baseUrl}?name=${searchTerm}`)
        .then(response => response.json())
        .then(data => displayCharacters(data.results))
        .catch(() => displayCharacters([]));
});

// Cargar inicialmente
fetchCharacters();
