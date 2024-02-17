// tlačítko
const submitButton = document.querySelector(".button-1");
// Typ
const nabidka = document.getElementById("nabidka");
const poptavka = document.getElementById("poptavka");

// Kategorie
const EKONOMIE = document.getElementById("EKONOMIE");
const FINANCE = document.getElementById("FINANCE");
const HOPO = document.getElementById("HOPO");
const PODNIK = document.getElementById("PODNIK");
const REGIO = document.getElementById("REGIO");
const VEEK = document.getElementById("VEEK");
const mikroekonomie = document.getElementById("mikroekonomie");
const makroekonomie = document.getElementById("makroekonomie");
const účetnictví = document.getElementById("ucetnictvi");
const anglictina = document.getElementById("anglictina");
const doprava = document.getElementById("doprava");

const historie = document.getElementById("historie");
const hudba = document.getElementById("hudba");
const matematika = document.getElementById("matematika");
const nemcina = document.getElementById("nemcina");
const pedagogika = document.getElementById("pedagogika");
const pravo = document.getElementById("pravo");
const programovani = document.getElementById("programovani");
const sociologie = document.getElementById("sociologie");
const sport = document.getElementById("sport");
const statistika = document.getElementById("statistika");

const spanelstina = document.getElementById("spanelstina");

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
  if (EKONOMIE.checked) {
    filterString += `&category=EKONOMIE`;
  }
  if (FINANCE.checked) {
    filterString += `&category=FINANCE`;
  }
  if (HOPO.checked) {
    filterString += `&category=HOPO`;
  }
  if (PODNIK.checked) {
    filterString += `&category=PODNIK`;
  }
  if (REGIO.checked) {
    filterString += `&category=REGIO`;
  }
  if (VEEK.checked) {
    filterString += `&category=VEEK`;
  }
  if (mikroekonomie.checked) {
    filterString += `&category=mikroekonomie`;
  }
  if (makroekonomie.checked) {
    filterString += `&category=makroekonomie`;
  }
  if (ucetnictvi.checked) {
    filterString += `&category=účetnictví`;
  }
  if (anglictina.checked) {
    filterString += `&category=angličtina`;
  }

  if (doprava.checked) {
    filterString += `&category=doprava`;
  }
  if (historie.checked) {
    filterString += `&category=historie`;
  }
  if (hudba.checked) {
    filterString += `&category=hudba`;
  }
  if (matematika.checked) {
    filterString += `&category=matematika`;
  }
  if (nemcina.checked) {
    filterString += `&category=němčina`;
  }
  if (pedagogika.checked) {
    filterString += `&category=pedagogika`;
  }
  if (pravo.checked) {
    filterString += `&category=právo`;
  }
  if (programovani.checked) {
    filterString += `&category=programování`;
  }

  if (sociologie.checked) {
    filterString += `&category=sociologie`;
  }

  if (sport.checked) {
    filterString += `&category=sport`;
  }

  if (statistika.checked) {
    filterString += `&category=statistika`;
  }
  if (spanelstina.checked) {
    filterString += `&category=španělština`;
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

// Message
const confirmPopUp = function (link) {
  window.location.href = link;
};

// Modal Filter
// Get the modal
const openModalFilterBtn = document.getElementById("modal-filter-button");
const modal = document.getElementById("myModal");
//const filterButton = document.getElementById("filterButton");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks 2x, open the modal - now once
openModalFilterBtn.addEventListener("click", function () {
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

//Go up
// const modalFilterBtn = document.getElementById("modal-filter-button");
// const here = document.querySelector(".go-up-here");

// btnScrollTo.addEventListener("click", function () {
//   here.scrollIntoView({ behavior: "smooth" });
// });
