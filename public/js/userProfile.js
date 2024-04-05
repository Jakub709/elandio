// variables
const movements = document.querySelector(".movements");
const labelBalance = document.querySelector(".balance__value");
//const errorMessage = document.querySelector(".error_message");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelDate = document.querySelector(".date");

// Funkce: pohyby na účtu
const createMovements = function (client) {
  movements.innerHTML = "";
  client.valueTransactions.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const sender = client.senderTransactions[i];
    const receiver = client.senderTransactions[i];
    const date = client.dateTransactions[i].split("T")[0];
    const html = `
      <li class="table-row">
      <div class="col col-1" data-label="ID:">${i + 1}</div>
      <div class="col col-2" data-label="Odesílatel:"><a href="/user-profile-username/${sender}">${sender}</a></div>
      <div class="col col-3" data-label="Částka:">${mov} EC</div>
      <div class="col col-4" data-label="Uživ. jméno:"><a href="/user-profile-username/${receiver}">${receiver}</a></div>
      <div class="col col-5" data-label="Datum:">${date}</div>
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
  $.get("/user-profile", (data) => {
    console.log(data);
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
