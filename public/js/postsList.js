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
const spolecenskeVedy = document.getElementById("spolecenskeVedy");
const sport = document.getElementById("sport");
const hudba = document.getElementById("hudba");
const filozofie = document.getElementById("filozofie");
const pedagogika = document.getElementById("pedagogika");
const cestina = document.getElementById("cestina");
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

// Pouze sledovan??
const following = document.getElementById("following");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (nabidka.checked) {
    filterString += `&type=nab??dka`;
  }
  if (poptavka.checked) {
    filterString += `&type=popt??vka`;
  }
  if (pravo.checked) {
    filterString += `&category=pr??vo`;
  }
  if (lekarstvi.checked) {
    filterString += `&category=l??ka??stv??`;
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
    filterString += `&category=angli??tina`;
  }
  if (nemcina.checked) {
    filterString += `&category=n??m??ina`;
  }
  if (spanelstina.checked) {
    filterString += `&category=??pan??l??tina`;
  }
  if (jazyky.checked) {
    filterString += `&category=jazyky`;
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
  if (spolecenskeVedy.checked) {
    filterString += `&category=spole??ensk??-v??dy`;
  }
  if (sport.checked) {
    filterString += `&category=sport`;
  }
  if (hudba.checked) {
    filterString += `&category=hudba`;
  }
  if (filozofie.checked) {
    filterString += `&category=filozofie`;
  }
  if (pedagogika.checked) {
    filterString += `&category=pedagogika`;
  }
  if (cestina.checked) {
    filterString += `&category=??e??tina`;
  }
  if (zabava.checked) {
    filterString += `&category=z??bava`;
  }
  if (ostatni.checked) {
    filterString += `&category=ostatn??`;
  }
  if (bakalar.checked) {
    filterString += `&level=bakal????`;
  }
  if (magistr.checked) {
    filterString += `&level=magistr`;
  }
  if (akademik.checked) {
    filterString += `&level=akademik`;
  }
  if (individualne.checked) {
    filterString += `&group=individu??ln??`;
  }
  if (skupinove.checked) {
    filterString += `&group=skupinov??`;
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
// const btnScrollTo = document.getElementById("go-top");
// const here = document.querySelector(".go-up-here");

// btnScrollTo.addEventListener("click", function () {
//   here.scrollIntoView({ behavior: "smooth" });
// });
