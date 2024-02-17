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

// Modal filter search
const submitButton = document.querySelector(".button-1");

const esfMU = document.getElementById("esfMU");
const fafMU = document.getElementById("fafMU");
const ffMU = document.getElementById("ffMU");
const fiMU = document.getElementById("fiMU");
const fspsMU = document.getElementById("fspsMU");
const fssMU = document.getElementById("fssMU");
const lfMU = document.getElementById("lfMU");
const pdfMU = document.getElementById("pdfMU");
const prfMU = document.getElementById("prfMU");
const prirodaMU = document.getElementById("prirodaMU");

const pardubickyKraj = document.getElementById("pardubickyKraj");
const kralovehradeckyKraj = document.getElementById("kralovehradeckyKraj");
const libereckyKraj = document.getElementById("libereckyKraj");
const usteckyKraj = document.getElementById("usteckyKraj");
const karlovarskyKraj = document.getElementById("karlovarskyKraj");
const plzenskyKraj = document.getElementById("plzenskyKraj");
const jihoceskyKraj = document.getElementById("jihoceskyKraj");
const stredoceskyKraj = document.getElementById("stredoceskyKraj");
const praha = document.getElementById("praha");
const vysocina = document.getElementById("vysocina");
const jihomoravskyKraj = document.getElementById("jihomoravskyKraj");
const olomouckyKraj = document.getElementById("olomouckyKraj");
const zlinskyKraj = document.getElementById("zlinskyKraj");
const moravskoslezskyKraj = document.getElementById("moravskoslezskyKraj");
const ostrava = document.getElementById("ostrava");
const brno = document.getElementById("brno");

let filterString = "";

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (esfMU.checked) {
    filterString += `&faculty=ESF MU`;
  }
  if (fafMU.checked) {
    filterString += `&faculty=FaF MU`;
  }
  if (ffMU.checked) {
    filterString += `&faculty=FF MU`;
  }
  if (fiMU.checked) {
    filterString += `&faculty=FI MU`;
  }
  if (fspsMU.checked) {
    filterString += `&faculty=FSpS MU`;
  }
  if (fssMU.checked) {
    filterString += `&faculty=FSS MU`;
  }
  if (lfMU.checked) {
    filterString += `&faculty=LF MU`;
  }
  if (pdfMU.checked) {
    filterString += `&faculty=PdF MU`;
  }
  if (prfMU.checked) {
    filterString += `&faculty=PrF MU`;
  }
  if (prirodaMU.checked) {
    filterString += `&faculty=PřF MU`;
  }
  if (pardubickyKraj.checked) {
    filterString += `&region=Pardubický kraj`;
  }
  if (kralovehradeckyKraj.checked) {
    filterString += `&region=Královehradecký kraj`;
  }
  if (libereckyKraj.checked) {
    filterString += `&region=Liberecký kraj`;
  }
  if (usteckyKraj.checked) {
    filterString += `&region=Ústecký kraj`;
  }
  if (karlovarskyKraj.checked) {
    filterString += `&region=Karlovarský kraj`;
  }
  if (plzenskyKraj.checked) {
    filterString += `&region=Plzeňský kraj`;
  }
  if (jihoceskyKraj.checked) {
    filterString += `&region=Jihočeský kraj`;
  }
  if (stredoceskyKraj.checked) {
    filterString += `&region=Středočeský kraj`;
  }
  if (praha.checked) {
    filterString += `&region=Praha`;
  }
  if (vysocina.checked) {
    filterString += `&region=Kraj Vysočina`;
  }
  if (jihomoravskyKraj.checked) {
    filterString += `&region=Jihomoravský kraj`;
  }
  if (olomouckyKraj.checked) {
    filterString += `&region=Olomoucký kraj`;
  }
  if (zlinskyKraj.checked) {
    filterString += `&region=Zlínský kraj`;
  }
  if (moravskoslezskyKraj.checked) {
    filterString += `&region=Moravskoslezský kraj`;
  }
  if (ostrava.checked) {
    filterString += `&region=Ostrava`;
  }
  if (brno.checked) {
    filterString += `&region=Brno`;
  }
  window.location.href = `/users-list?${filterString}`;
});

// Go up
// const btnScrollTo = document.getElementById("go-top");
// const here = document.querySelector(".go-up-here");

// btnScrollTo.addEventListener("click", function () {
//   here.scrollIntoView({ behavior: "smooth" });
// });
