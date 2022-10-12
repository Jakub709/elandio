const submitButton = document.querySelector(".button-1");
// Typ
const nabidka = document.getElementById("nabidka");
const poptavka = document.getElementById("poptavka");

// Kategorie
const pravo = document.getElementById("pravo");
const lekarstvi = document.getElementById("lekarstvi");
const geografie = document.getElementById("geografie");
const geologie = document.getElementById("geologie");
const biologie = document.getElementById("biologie");
const chemie = document.getElementById("chemie");
const fyzika = document.getElementById("fyzika");
const matematika = document.getElementById("matematika");
const statistika = document.getElementById("statistika");
const historie = document.getElementById("historie");
const anglictina = document.getElementById("anglictina");
const nemcina = document.getElementById("nemcina");
const spanelstina = document.getElementById("spanelstina");
const ostatniJazyky = document.getElementById("ostatniJazyky");
const farmacie = document.getElementById("farmacie");
const ekonomie = document.getElementById("ekonomie");
const informatika = document.getElementById("informatika");
const psychologie = document.getElementById("psychologie");
const sociologie = document.getElementById("sociologie");
const mezinarodniVztahy = document.getElementById("mezinarodniVztahy");
const sport = document.getElementById("sport");
const hudba = document.getElementById("hudba");
const agronomie = document.getElementById("agronomie");
const lesnictvi = document.getElementById("lesnictvi");
const veterinarstvi = document.getElementById("veterinarstvi");
const zabava = document.getElementById("zabava");
const ostatni = document.getElementById("ostatni");

// Level
const bakalar = document.getElementById("bakalar");
const magistr = document.getElementById("magistr");
const akademik = document.getElementById("akademik");

// Group
const individualne = document.getElementById("individualne");
const skupinove = document.getElementById("skupinove");

// Environment
const offline = document.getElementById("offline");
const online = document.getElementById("online");

// Sorting
const sortPriceLow = document.getElementById("sort-price-low");
const sortPriceHigh = document.getElementById("sort-price-high");
const sortTime = document.getElementById("sort-time");
let filterString = "";

// Pouze sledovaní
const following = document.getElementById("following");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (nabidka.checked) {
    filterString += `&type=nabídka`;
  }
  if (poptavka.checked) {
    filterString += `&type=poptávka`;
  }
  if (pravo.checked) {
    filterString += `&category=právo`;
  }
  if (lekarstvi.checked) {
    filterString += `&category=lékařství`;
  }
  if (geografie.checked) {
    filterString += `&category=geografie`;
  }
  if (geologie.checked) {
    filterString += `&category=geologie`;
  }
  if (chemie.checked) {
    filterString += `&category=chemie`;
  }
  if (fyzika.checked) {
    filterString += `&category=fyzika`;
  }
  if (matematika.checked) {
    filterString += `&category=matematika`;
  }
  if (statistika.checked) {
    filterString += `&category=statistika`;
  }
  if (historie.checked) {
    filterString += `&category=historie`;
  }
  if (anglictina.checked) {
    filterString += `&category=angličtina`;
  }
  if (nemcina.checked) {
    filterString += `&category=němčina`;
  }
  if (spanelstina.checked) {
    filterString += `&category=španělština`;
  }
  if (ostatniJazyky.checked) {
    filterString += `&category=ostatní-jazyky`;
  }
  if (farmacie.checked) {
    filterString += `&category=farmacie`;
  }
  if (ekonomie.checked) {
    filterString += `&category=ekonomie`;
  }
  if (informatika.checked) {
    filterString += `&category=informatika`;
  }
  if (psychologie.checked) {
    filterString += `&category=psychologie`;
  }
  if (sociologie.checked) {
    filterString += `&category=sociologie`;
  }
  if (mezinarodniVztahy.checked) {
    filterString += `&category=mezinárodní-vztahy`;
  }
  if (sport.checked) {
    filterString += `&category=sport`;
  }
  if (hudba.checked) {
    filterString += `&category=hudba`;
  }
  if (agronomie.checked) {
    filterString += `&category=agronomie`;
  }
  if (lesnictvi.checked) {
    filterString += `&category=lesnictví`;
  }
  if (veterinarstvi.checked) {
    filterString += `&category=veterinářství`;
  }
  if (zabava.checked) {
    filterString += `&category=zábava`;
  }
  if (ostatni.checked) {
    filterString += `&category=ostatní`;
  }
  if (bakalar.checked) {
    filterString += `&level=bakalář`;
  }
  if (magistr.checked) {
    filterString += `&level=magistr`;
  }
  if (akademik.checked) {
    filterString += `&level=akademik`;
  }
  if (individualne.checked) {
    filterString += `&group=individuálně`;
  }
  if (skupinove.checked) {
    filterString += `&group=skupinově`;
  }
  if (offline.checked) {
    filterString += `&environment=offline&environment=offline/online`;
  }
  if (online.checked) {
    filterString += `&environment=online&environment=offline/online`;
  }
  if (sortPriceLow.checked) {
    filterString += `&sort=price`;
  }
  if (sortPriceHigh.checked) {
    filterString += `&sort=-price`;
  }
  if (following.checked) {
    window.location.href = `/posts-list-following?${filterString}`;
  } else {
    window.location.href = `/posts-list?${filterString}`;
  }
});

// Search box
const inputSearch = document.querySelector(".header__input");
const searchBtn = document.querySelector(".bx-search");

inputSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    window.location.href = `/posts-search?search=${inputSearch.value}`;
  }
});
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = `/posts-search?search=${inputSearch.value}`;
});

// Modal Filter
// Get the modal
const modal = document.getElementById("myModal");
const filterButton = document.getElementById("filterButton");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks 2x, open the modal
document.addEventListener("dblclick", function () {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function () {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Go up
const btnScrollTo = document.getElementById("go-top");
const here = document.querySelector(".go-up-here");

btnScrollTo.addEventListener("click", function () {
  here.scrollIntoView({ behavior: "smooth" });
});
