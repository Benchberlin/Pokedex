const pokeapi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
});

function getPokemonInfo(theId) {
  pokeapi
    .get(theId)
    .then((responseFromAPI) => {
      console.log("responde from api is", responseFromAPI.data);
      
      document.getElementById("pokemonImg").src =
        responseFromAPI.data.sprites.front_default;

      document.getElementById("pokemonName").innerHTML = 
      responseFromAPI.data.name;

    })
    .catch((err) => {
      console.log("Error:", err);
    });
}

document.getElementById("theButton").onclick = function () {
  const pokemon = document.getElementById("theInput").value;
  getPokemonInfo(pokemon);
};
