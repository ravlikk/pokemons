import getPockemon from "./getPockemon";

const err = document.querySelector(".err__container");
const input = document.querySelector(".input");
const submit = document.querySelector(".btn-sumbit");

submit.addEventListener("click", (event, name, data) => {
  event.preventDefault();
  err.style.display = "none";
  name = input.value;
  input.value = "";
  getPockemon(name, data);
});
