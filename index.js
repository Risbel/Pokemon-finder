// Logica referente a index.html
function start(e) {
  if (e.keyCode == 13) {
      load()
  }
}
window.onkeypress = start;

const load = () => {
  // en vez de input ponle inputValue, porque lo q guardas ahí es el valor del input
  // nada... cosas semánticas
  const InitialInputValue = document.getElementById("search-input").value;
  let inputValue = InitialInputValue.toLowerCase()
  // Esto es lo del redirect
  window.location.replace(`/details.html?name=${inputValue}`);
};

const input = document.querySelector(`#search-input`)
const pokemonsList = document.querySelector(`#pokemons`)

let pokemonsListNames = []
 
window.onload = () => {
    fetch(`${BASE_URL}/pokemon?offset=0&limit=12`).then(data => data.json())
    .then(data => {pokemonsListNames = data.results; renderPokemons(pokemonsListNames)})
}

const createPokeItems = pokemonsListNames => pokemonsListNames.map(pokemon => `<li>${pokemon.name}</li>`)

input.addEventListener(`keyup`, e => {
    const newPpokemons = pokemonsListNames.filter(pokemon => pokemon.name.includes(input.value))
    renderPokemons(newPpokemons)
})

const renderPokemons = (pokemonsListNames) => {
    const pokeItems = createPokeItems(pokemonsListNames)
    console.log(pokeItems)
}