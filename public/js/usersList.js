// Search box
const inputSearch = document.querySelector(".header__input");
const searchBtn = document.querySelector(".bx-search");

inputSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    window.location.href = `/users-search?search=${inputSearch.value}`;
  }
});
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = `/users-search?search=${inputSearch.value}`;
});

// Go up
// const btnScrollTo = document.getElementById("go-top");
// const here = document.querySelector(".go-up-here");

// btnScrollTo.addEventListener("click", function () {
//   here.scrollIntoView({ behavior: "smooth" });
// });
