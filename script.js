// Get DOM elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const pokeSprite = document.getElementById("pokeSprite");
const hp = document.getElementById("hp");
const atk = document.getElementById("attack");
const def = document.getElementById("defense");
const specAtk = document.getElementById("special-attack");
const specDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");


// Fetch Pokémon data from the API
const fetchPokeData = async (pokemonName) => {
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName.toLowerCase()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        return await response.json(); // Return the Pokémon data
    } catch (error) {
        alert("Error: " + error.message); // Proper error handling
    }
};

// Display Pokémon types
const setType = (data) => {
    types.innerHTML = ""; // Clear the types element before setting new content

    // Loop through each type and create a new div for each type
    data.types.forEach(typeInfo => {
        const typeDiv = document.createElement("div");
        typeDiv.textContent = typeInfo.type.name.toUpperCase(); // Set type name in uppercase
        types.appendChild(typeDiv); // Append each type to the types container
    });
};

// Display Pokémon data in the DOM
const displayPokemonData = (data) => {
    pokeName.textContent = data.name.toUpperCase(); // Capitalize Pokémon name
    pokeId.textContent = `#${data.id}`;              // Set ID
    weight.textContent = `${data.weight}`;           // Set weight
    height.textContent = `${data.height}`;           // Set height
    setType(data);                                   // Set types

    // Display Pokémon sprite
    pokeSprite.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="image of ${data.name}"/>`;

    // Set base stats
    hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    atk.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    def.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specAtk.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specDef.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
};

// Handle Pokémon search
const searchPokemon = async () => {
    const name = searchInput.value.trim().toLowerCase(); // Get the search input and trim extra spaces
    if (!name) return alert("Please enter a Pokémon name or ID"); // Handle empty input

    const pokeData = await fetchPokeData(name); // Get the specific Pokémon data
    if (!pokeData) return alert("Pokémon not found");

    displayPokemonData(pokeData); // Display the Pokémon data
};

// Add event listener for search button click
searchBtn.addEventListener("click", searchPokemon);
