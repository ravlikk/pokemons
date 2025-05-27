import axios from "axios";

const favoriteList = document.querySelector(".favorite__list");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

export async function favCart() {
  let getfavorites = JSON.parse(localStorage.getItem("favorites"));

  getfavorites.forEach((e) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${e}`).then((response) => {
      const data = response.data;
      let abilities = data.abilities.map((x) => x.ability.name);
      let types = data.types.map((x) => x.type.name);

      const dataName = document.querySelector(`[data-id="${data.id}"]`);
      if (dataName) return;

      favoriteList.insertAdjacentHTML(
        "afterbegin",
        `
          <li data-id="${data.id}" class="card ${
          types[0]
        }" data-tilt data-tilt-max="10" data-tilt-speed="500"
        data-tilt-perspective="1800" data-tilt-glare data-tilt-max-glare="0.1" data-tilt-scale="1.03"
        data-tilt-reset="true">
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
            <div class="favcard__par" data-tilt-transform-element>
                    <p class="abilities">ability: ${abilities.join(" ")}</p>
    </li>`
      );
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {});
    });
  });
}
function removeFavCart(id) {
  const dataName = document.querySelector(`[data-id="${id}"]`);
  if (dataName) {
    dataName.remove();
  }
}

export function showFavList() {
  const btn = document.querySelector(".cta");
  const modal = document.querySelector(".modal");
  btn.addEventListener("click", () => {
    modal.classList.toggle("show");
    favCart();

    if (modal.classList.contains("show")) {
      btn.querySelector(".cta__text").textContent = "back";
    } else {
      btn.querySelector(".cta__text").textContent = "show favlist";
    }
  });
}
export function addFavorite() {
  const pokiList = document.querySelector(".pockemons__list");
  pokiList.addEventListener("click", (event) => {
    let id = event.target.closest(".card");
    id = id.querySelector(".id").textContent;
    if (event.target.classList.contains("liked")) {
      event.target.classList.remove("liked");
      favorites = favorites.filter((e) => e !== id);
      removeFavCart(id);
    } else {
      event.target.classList.add("liked");
      favorites.unshift(id);
    }
    favorites.forEach((e) => {});
    favorites = Array.from(new Set(favorites));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });
}
