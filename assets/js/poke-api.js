const pokeApi = {};

function convertPokeApiToPokemon(pokeApiPokemon) {
  const pokemon = new Pokemon();
  pokemon.name = pokeApiPokemon.name;
  pokemon.id = pokeApiPokemon.id;
  pokemon.sprite = pokeApiPokemon.sprites.other.dream_world.front_default;

  const types = pokeApiPokemon.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.primaryType = type;

  const stats = pokeApiPokemon.stats.map(
    (statsNumber) => statsNumber.base_stat
  );
  pokemon.stats = stats;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToPokemon);
};

pokeApi.getPokemon = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};
