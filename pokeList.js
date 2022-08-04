// Logica referente a pokeList.html

//esto se ejecuta con el onclick() en el boton rojo generate +
const generatePokes = () => {
  loadPokeres().then((data) => {
    data.results.forEach((pokemon) => fetchPokeData(pokemon));
  });

  const fetchPokeData = (pokemon) => {
    const URL = pokemon.url;
    fetch(URL)
      .then((response) => response.json())
      .then((pokeData) => renderPokeData(pokeData));
  };
};

const renderPokeData = (pokeData) => {
  let allPokemonContainer = document.getElementById("cardContainer");

  let linkToDetails = document.createElement("a");
  linkToDetails.setAttribute(
    "href",
    `./details.html?name=` + `${pokeData.name}`
  );

  let pokeContainer = document.createElement("div"); //div will be used to hold the data/details for indiviual pokemon.{}
  pokeContainer.setAttribute("id", "newCards");
  pokeContainer.classList.add("newCards");

  let pokeImg = document.createElement("img");
  pokeImg.src = pokeData.sprites.other.dream_world.front_default;
  pokeImg.setAttribute("id", "pokeImg");
  pokeImg.classList.add("pokeImg");

  let pokeName = document.createElement("h4");
  pokeName.innerText = pokeData.name.toUpperCase();
  pokeName.classList.add("pokeName");

  let pokeNumber = document.createElement("p");
  pokeNumber.innerText = `ID:${pokeData.id}`;

  pokeContainer.append(pokeNumber, pokeImg, pokeName /*,pokeTypes*/); //appending all details to the pokeContainer div
  linkToDetails.appendChild(pokeContainer);
  allPokemonContainer.appendChild(linkToDetails); //appending that pokeContainer div to the main div which will hold all the pokemon cards
};

/*
const createTypes = (types, ul) => types.forEach((type) => {
    let typeLi = document.createElement('li');
    typeLi.innerText = type['type']['name'];
    ul.append(typeLi)
    })
*/


/******************************************** Samuel *********************************************/
const populatePokemonsData = (data) => {
  // espera a que todas las promesas terminen y en el .then se devuelve la lista de los valores
  // de cada promesa
  Promise.all(
    data.results.map((pokemon) =>
      srcPokemonByName(pokemon.name).then(
        (pokemonData) => pokemonData)
    )
  ).then((allData) => {
    for (const pokemonData of allData) {
      renderPokeData(pokemonData);
    }
  });
};

const updatePaginationLinks = (offset, limit, prev, next) => {
  const nextLink = document.getElementById("next-link");
  const prevLink = document.getElementById("prev-link");

  if (next) {
    const nextOffset = offset + limit; // Siguiente pagina
    nextLink.href = `./pokeList.html?offset=${nextOffset}&limit=${limit}`;
    nextLink.classList.remove("disabled");
  } else {
    // Decorar el link como desactivado (mirar css)
    nextLink.classList.add("disabled");
  }

  if (prev) {
    const prevOffset = offset - limit; // Pagina anterior
    prevLink.href = `./pokeList.html?offset=${prevOffset}&limit=${limit}`;
    prevLink.classList.remove("disabled");
  } else {
    // Decorar el link como desactivado (mirar css)
    prevLink.classList.add("disabled");
  }
};

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const offset = Number(params.get("offset")) || 0;
  const limit = Number(params.get("limit")) || 12;

  getPokemons(offset, limit).then((data) => {
    console.log(data)
    populatePokemonsData(data);
    updatePaginationLinks(offset, limit, data.previous, data.next);
  });
};
