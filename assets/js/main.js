const pokemonList = document.getElementById("pokemonList");
const btnLoadMore = document.getElementById("btnLoadMore");
const detailPokemon = document.getElementById("detailPokemon");

const maxRecords = 151;
const limit = 20;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons
      .map(
        (pokemon) => `
        <a href="#${pokemon.name}">
        <li class="pokemon ${pokemon.primaryType}" onclick="ModelDetail('${
          pokemon.name
        }')"">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types ">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
            </ol>
            <img src="${pokemon.sprite}"
                alt="${pokemon.name}">
        </div>
      </li>
      </a>`
      )
      .join("");

    const modalHTML = pokemons
      .map(
        (pokemon) =>
          `<div class="pokemonDetail ${pokemon.primaryType}" id="${
            pokemon.name
          }" style="display=none">
                
                    <div class="modal-content">
                        
                        <h2>${pokemon.name}</h2>

                        <div class="modal-img">

                            <img src="${pokemon.sprite}" alt="${pokemon.name}">

                        </div>

                        <hr>

                        <div class="modal-detail">
                            <h3>Types</h3>
                            <ol class="modal-types">
                                ${pokemon.types
                                  .map(
                                    (type) =>
                                      `<li class="type ${type}">${type}</li>`
                                  )
                                  .join("")}
                            </ol>
                        </div>

                        <div class="modal-status" id="${pokemon.name}">
                            <h3>Base Status</h3>
                            <ol class="status">
                                <li class="">HP: ${pokemon.stats[0]}</li>
                                <li class="">Attack: ${pokemon.stats[1]}</li>

                                <li class="">Defense: ${pokemon.stats[2]}</li>
                                <li class="">Special-attack: ${
                                  pokemon.stats[3]
                                }</li>

                                <li class="">Special-defense: ${
                                  pokemon.stats[4]
                                }</li>
                                <li class="">Speed: ${pokemon.stats[5]}</li>
                            </ol>
                        </div>

                    </div>

                </div>`
      )
      .join("");
    pokemonList.innerHTML += newHTML;
    detailPokemon.innerHTML += modalHTML;
  });
}

loadPokemonItems(offset, limit);

btnLoadMore.addEventListener("click", () => {
  offset += limit;
  const qtRecordNextPage = offset + limit;
  if (qtRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);
    btnLoadMore.parentElement.removeChild(btnLoadMore);
  } else {
    loadPokemonItems(offset, limit);
  }
});

function ModelDetail() {
  detailPokemon.style.display = "block";

  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    detailPokemon.style.display = "none";
  };
}
