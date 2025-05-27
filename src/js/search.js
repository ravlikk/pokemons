import getPockemon from "./getPockemon.js";

const err = document.querySelector(".err__container");
const input = document.querySelector(".input");
const submit = document.querySelector(".fotm");

submit.addEventListener("submit", (event, name, data) => {
  event.preventDefault();
  err.style.display = "none";
  name = input.value;
  input.value = "";
  getPockemon(name, data);
});
