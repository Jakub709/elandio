// variables
const movements = document.querySelector(".movements");
const labelBalance = document.querySelector(".balance__value");
//const errorMessage = document.querySelector(".error_message");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelDate = document.querySelector(".date");

// Funkce: pohyby na účtu, bilance účtu, summary
const createMovements = function (transactions) {
  movements.innerHTML = "";
  transactions.valueTransactions.forEach(function (mov, i) {
    const type = mov > 1000 ? "deposit" : "withdrawal";
    const sender = transactions.senderTransactions[i];
    const receiver = transactions.receiverTransactions[i];
    const date = transactions.dateTransactions[i].split("T")[0];
    const html = `
      <li class="table-row">
      <div class="col col-1" data-label="ID:">${i + 1}</div>
      <div class="col col-2" data-label="Odesílatel:"><a href="/user-profile-username/${sender}">${sender}</a></div>
      <div class="col col-3" data-label="Částka:">${mov} EC</div>
      <div class="col col-4" data-label="Příjemce:"><a href="/user-profile-username/${receiver}">${receiver}</a></div>
      <div class="col col-5" data-label="Datum:">${date}</div>
      </li>`;
    movements.insertAdjacentHTML("afterbegin", html);
  });
};

// Tento js soubor je připojen k bank app, proto se nespustí na jiné stránce
document.addEventListener("DOMContentLoaded", function (event) {
  $.get("/transactions", (data) => {
    console.log(data);
    createMovements(data);
    //calcDisplaySummary(bankCoins.userLoggedIn);
    //labelBalance.textContent = bankCoins.userLoggedIn.accountBalance + ` EC`;
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
