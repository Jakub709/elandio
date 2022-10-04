// variables
const btnTransfer = document.querySelector(".button-1");
const moneyTransfer = document.getElementById("moneyTransfer");
const usernameTransfer = document.getElementById("usernameTransfer");
const nameTransfer = document.getElementById("nameTransfer");
const movements = document.querySelector(".movements");
const labelBalance = document.querySelector(".balance__value");
//const errorMessage = document.querySelector(".error_message");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelDate = document.querySelector(".date");

// Mobile navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

// Event listeners for reload
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const data = {
    moneyTransfer: moneyTransfer.value,
    usernameTransfer: usernameTransfer.value,
    nameTransfer: nameTransfer.value,
  };

  $.post("/transfer", data, (postData, status, xhr) => {
    if (!postData) {
      return;
    } else {
      labelBalance.textContent = postData.userLoggedIn.accountBalance + ` EC`;
      //errorMessage.textContent = postData.errorMessage;
      const userDB = postData.userLoggedIn;
      createMovements(userDB);
      calcDisplaySummary(postData.userLoggedIn);
      moneyTransfer.value = "";
      usernameTransfer.value = "";
      nameTransfer.value = "";
      if (postData.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Platba provedena",
          text: "Educoiny byly úspěšně převedeny.",
          confirmButtonColor: "#51BE7C",
          confirmButtonText: "Hotovo",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Pozor chyba",
          text: `${postData.errorMessage}.`,
          confirmButtonColor: "#F27474",
          confirmButtonText: "Rozumím",
        });
      }
    }
  });
});

//Datum (čas pohybu na účtě)
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Dnes";
  if (daysPassed === 1) return "Včera";
  if (daysPassed <= 4) return `${daysPassed} dny zpět`;
  if (daysPassed <= 7) return `${daysPassed} dní zpět`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// Funkce: pohyby na účtu, bilance účtu, summary
const createMovements = function (userDB) {
  movements.innerHTML = "";
  userDB.moneyTransfer.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(userDB.dateTransfer[i]);
    const displayDate = formatMovementDate(date, "cs-CZ");
    const nameTransfer = userDB.nameTransfer[i];
    const usernameTransfer = userDB.usernameTransfer[i];
    const html = `
    <li class="table-row">
    <div class="col col-1" data-label="ID:">${i + 1}</div>
    <div class="col col-2 table-row--${type}" data-label="Jméno:">${nameTransfer}</div>
    <div class="col col-3 table-row--${type}" data-label="Částka:">${mov} EC</div>
    <div class="col col-4" data-label="Uživatelské jméno:"><a href="/user-profile-username/${usernameTransfer}">${usernameTransfer}</a></div>
    <div class="col col-5" data-label="Datum:">${displayDate}</div>
    </li>`;
    movements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplaySummary = function (userDB) {
  const incomes = userDB.moneyTransfer
    .filter((mov) => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumIn.textContent = `${incomes} EC`;

  const out = userDB.moneyTransfer
    .filter((mov) => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} EC`;
};

// Tento js soubor je připojen k bank app, proto se nespustí na jiné stránce
document.addEventListener("DOMContentLoaded", function (event) {
  $.get("/transfer", (bankCoins) => {
    createMovements(bankCoins.userLoggedIn);
    calcDisplaySummary(bankCoins.userLoggedIn);
    labelBalance.textContent = bankCoins.userLoggedIn.accountBalance + ` EC`;
    //errorMessage.textContent = bankCoins.errorMessage;
  });
});

// Datum
const now = new Date();
const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

labelDate.innerHTML = `<b>Datum:</b> ${new Intl.DateTimeFormat(
  "cs-CZ",
  options
).format(now)}`;
