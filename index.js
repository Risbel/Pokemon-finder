let pokemonsListNames = [];

window.onload = () => {
  fetch(`${BASE_URL}/pokemon?offset=0&limit=1000`)
    .then((data) => data.json())
    .then((data) => {
      pokemonsListNames = data.results;
    });
};

const input = document.querySelector(`#search-input`);
const pokemonsList = document.querySelector(`#pokemons`);

input.addEventListener(`keyup`, (e) => {
  const inputValue = input.value.trim().toLowerCase(); // Se utiliza el trim para eliminar los espacios vacíos a los lados del valor de entrada y se convierte a minúsculas para asegurar una búsqueda sin distinción de mayúsculas o minúsculas.
  const newPpokemons = pokemonsListNames.filter((pokemon) => pokemon.name.includes(inputValue));

  if (inputValue.length > 0) {
    renderPokemons(newPpokemons);
  } else {
    pokemonsList.innerHTML = ""; // Si el valor de entrada es vacío, entonces no se muestra ninguna lista.
  }
});

const renderPokemons = (pokemonsListNames) => {
  const pokeItems = createPokeItems(pokemonsListNames);
  pokemonsList.innerHTML = pokeItems.join(" ");
};

const createPokeItems = (pokemonsListNames) => pokemonsListNames.map((pokemon) => `<li>${pokemon.name}</li>`);

window.onkeypress = start;

function start(e) {
  if (e.keyCode == 13) {
    load();
  }
}

const load = () => {
  const InitialInputValue = document.getElementById("search-input").value;
  let inputValue = InitialInputValue.toLowerCase();
  window.location.replace(`/details.html?name=${inputValue}`);
};
