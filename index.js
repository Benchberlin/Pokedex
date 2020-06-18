let errDiv;

const pokeapi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
});

function getRandomPokemons() {
  pokeapi
    .get("https://pokeapi.co/api/v2/pokemon?limit=25")
    .then((responseFromAPI) => {
      let results = responseFromAPI.data.results;
      results.forEach(function (pokemon) {
        console.log(pokemon.name);
        console.log(pokemon.url);
        fetchData(pokemon);
      });
    });
  console.log("all pokemons");
}

function fetchData(pokemon) {
  pokeapi
    .get(pokemon.url)

    .then(function (banana) {
      renderPokemon(banana);
      console.log("fetching");
    });
}

function renderPokemon(banana) {
  console.log("rendering");
  var newDiv = document.createElement("div");
  newDiv.classList.add("poke-container");
  var newContent = document.createTextNode(banana.data.name);
  let pokeImage = document.createElement("IMG");
  pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${banana.data.id}.png`;
  newDiv.append(pokeImage);

  newDiv.appendChild(newContent);
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}

function clearList() {
  let allElements = document.querySelectorAll(".poke-container");
  allElements.forEach((el) => el.remove()); // for Each element
  document.getElementById("pokemonImg").src = "";

  document.getElementById("pokemonName").innerHTML = "";

  document.getElementById("pokemonInfos").innerText = "";
}
function getPokemonInfo(theId) {
  pokeapi
    .get(theId)
    .then((responseFromAPI) => {
      const pokemonName = responseFromAPI.data.name;
      const pokemonId = responseFromAPI.data.id;
      const pokemontype1 = responseFromAPI.data.types[0].type.name;

      const pokemonweight = responseFromAPI.data.weight;
      const pokemonheight = responseFromAPI.data.height;
      const pokemonImg = responseFromAPI.data.sprites.front_default;

      console.log("response from api is", responseFromAPI.data);

      document.getElementById("pokemonImg").src = pokemonImg;

      document.getElementById("pokemonName").innerHTML = pokemonName;

      document.getElementById("pokemonInfos").innerText =
        "id: " +
        pokemonId +
        "  type: " +
        pokemontype1 +
        "  height: " +
        pokemonheight +
        "  weight: " +
        pokemonweight;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
}

document.getElementById("theButton").onclick = function () {
  const pokemon = document.getElementById("theInput").value;
  getPokemonInfo(pokemon);
};

document.getElementById("randomButton").onclick = function () {
  getRandomPokemons();
};

document.getElementById("clearButton").onclick = function () {
  clearList();
};
