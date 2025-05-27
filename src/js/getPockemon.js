import axios from "axios";

const error = document.querySelector(".error");
const list = document.querySelector(".pockemons__list");
export default async function getPockemon(name, data) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      data = response.data;
      let abilities = data.abilities.map((x) => x.ability.name);
      let types = data.types.map((x) => x.type.name);

      const isExists = document.querySelector(`[data-name="${data.name}"]`);
      if (isExists) return;

      list.insertAdjacentHTML(
        "afterbegin",
        `
          <li  data-name="${data.name}" class="card ${
          types[0]
        }" data-tilt data-tilt-max="10" data-tilt-speed="500"
        data-tilt-perspective="1800" data-tilt-glare data-tilt-max-glare="0.1" data-tilt-scale="1.03"
        data-tilt-reset="true">
        <p class="card__text id">${data.id}</p>
        <div class="card__inf" data-tilt-transform-element>
            <div class="card-int__char" >
          
                <p class="card__text type">${types.join(", ")}</p>
                <p class="card__text name">${data.name}</p>
            </div>
            <p class="card__text hp">${data.stats[0].base_stat}HP</p>
        </div>
        <img class="card__img" data-tilt-transform-element 
            src="${data.sprites.other.dream_world.front_default}"
            alt="img">
            <div class="card__par" data-tilt-transform-element>
                        <div class="card__abilities">
                    <p class="abilities">ability:</p>
                    <p class="ability">${abilities.join(" ")}</p>
                    </div>
                <svg class="icon-heart"><use class="like" xlink:href="./src/img/symbol-defs.svg#icon-heart"></use></svg>        </div>
    </li>`
      );
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {}); 
    })
    .catch(() => {
      const err = document.querySelector(".err__container");
      err.style.display = "block";
    });
}
