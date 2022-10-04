const submitButton = document.querySelector(".button-1");
// Typ
const nabidka = document.getElementById("nabidka");
const poptavka = document.getElementById("poptavka");

// Kategorie
const javaScript = document.getElementById("javaScript");
const reactVueAngular = document.getElementById("reactVueAngular");
const node = document.getElementById("node");
const typescript = document.getElementById("typescript");
const python = document.getElementById("python");
const htmlcss = document.getElementById("htmlcss");
const java = document.getElementById("java");
const databaze = document.getElementById("databaze");
const csharp = document.getElementById("csharp");
const cplusplus = document.getElementById("cplusplus");
const php = document.getElementById("php");
const swiftKotlinDart = document.getElementById("swift/kotlin/dart");
const statistika = document.getElementById("statistika");
const r = document.getElementById("r");
const matlab = document.getElementById("matlab");
const tableauPowerBI = document.getElementById("tableau/powerbi");
const vba = document.getElementById("vba");
const ruby = document.getElementById("ruby");
const devOps = document.getElementById("devOps");
const go = document.getElementById("go");
const testovani = document.getElementById("testovani");
const anglictina = document.getElementById("anglictina");
const softSkills = document.getElementById("softSkills");
const ostatni = document.getElementById("ostatni");

// Level
const junior = document.getElementById("junior");
const medior = document.getElementById("medior");
const senior = document.getElementById("senior");

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
  if (javaScript.checked) {
    filterString += `&category=javascript`;
  }
  if (reactVueAngular.checked) {
    filterString += `&category=react/vue/anglular`;
  }
  if (node.checked) {
    filterString += `&category=node`;
  }
  if (typescript.checked) {
    filterString += `&category=typescript`;
  }
  if (python.checked) {
    filterString += `&category=python`;
  }
  if (htmlcss.checked) {
    filterString += `&category=html/css`;
  }
  if (java.checked) {
    filterString += `&category=java`;
  }
  if (databaze.checked) {
    filterString += `&category=databáze`;
  }
  if (csharp.checked) {
    filterString += `&category=csharp`;
  }
  if (cplusplus.checked) {
    filterString += `&category=cplusplus`;
  }
  if (php.checked) {
    filterString += `&category=php`;
  }
  if (swiftKotlinDart.checked) {
    filterString += `&category=swift/kotlin/dart`;
  }
  if (statistika.checked) {
    filterString += `&category=statistika`;
  }
  if (r.checked) {
    filterString += `&category=r`;
  }
  if (matlab.checked) {
    filterString += `&category=matlab`;
  }
  if (tableauPowerBI.checked) {
    filterString += `&category=tableau/powerbi`;
  }
  if (vba.checked) {
    filterString += `&category=vba`;
  }
  if (ruby.checked) {
    filterString += `&category=ruby`;
  }
  if (devOps.checked) {
    filterString += `&category=devops`;
  }
  if (go.checked) {
    filterString += `&category=go`;
  }
  if (testovani.checked) {
    filterString += `&category=testovaní`;
  }
  if (anglictina.checked) {
    filterString += `&category=anglictina`;
  }
  if (softSkills.checked) {
    filterString += `&category=softskills`;
  }
  if (ostatni.checked) {
    filterString += `&category=ostatní`;
  }
  if (junior.checked) {
    filterString += `&level=junior`;
  }
  if (medior.checked) {
    filterString += `&level=medior`;
  }
  if (senior.checked) {
    filterString += `&level=senior`;
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
