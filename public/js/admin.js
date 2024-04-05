const chart1 = document.getElementById("myChart1").getContext("2d");

const currentDate = new Date();
const day = currentDate.getDay();
console.log(day);

let labelsDay;
if (day === 6) {
  labelsDay = [
    "neděle",
    "pondělí",
    "úterý",
    "středa",
    "čtvrtek",
    "pátek",
    "sobota",
  ];
} else if (day === 0) {
  labelsDay = [
    "pondělí",
    "úterý",
    "středa",
    "čtvrtek",
    "pátek",
    "sobota",
    "neděle",
  ];
} else if (day === 1) {
  labelsDay = [
    "úterý",
    "středa",
    "čtvrtek",
    "pátek",
    "sobota",
    "neděle",
    "pondělí",
  ];
} else if (day === 2) {
  labelsDay = [
    "středa",
    "čtvrtek",
    "pátek",
    "sobota",
    "neděle",
    "pondělí",
    "úterý",
  ];
} else if (day === 3) {
  labelsDay = [
    "čtvrtek",
    "pátek",
    "sobota",
    "neděle",
    "pondělí",
    "úterý",
    "středa",
  ];
} else if (day === 4) {
  labelsDay = [
    "pátek",
    "sobota",
    "neděle",
    "pondělí",
    "úterý",
    "středa",
    "čtvrtek",
  ];
} else if (day === 5) {
  labelsDay = [
    "sobota",
    "neděle",
    "pondělí",
    "úterý",
    "středa",
    "čtvrtek",
    "pátek",
  ];
}

document.addEventListener("DOMContentLoaded", function (event) {
  $.get("/admin-data", (data) => {
    console.log(data.dateTransactions);
    console.log(data.valueTransactions);

    const transfers = {
      dateTransactions: data.dateTransactions,
      valueTransactions: data.valueTransactions,
    };
    // var transfers = {
    //   dateTransactions: [
    //     "2024-03-20T15:34:59.641+00:00",
    //     "2024-03-20T15:34:59.641+00:00",
    //     "2024-03-21T15:34:59.641+00:00",
    //     "2024-03-21T15:34:59.641+00:00",
    //     "2024-03-22T15:34:59.641+00:00",
    //   ],
    //   valueTransactions: [100, 200, 50, 75, 150],
    // };
    function sumTransactionsByDate(transfers) {
      var sums = {};
      for (var i = 0; i < transfers.dateTransactions.length; i++) {
        var date = transfers.dateTransactions[i].split("T")[0]; // Extrahovat datum z celého řetězce
        var value = transfers.valueTransactions[i];
        // Pokud je datum již v objektu sums, přičíst hodnotu transakce
        if (sums[date]) {
          sums[date] += value;
        } else {
          // Jinak vytvořit nový klíč s hodnotou transakce
          sums[date] = value;
        }
      }
      // Vytvořit pole s agregovanými hodnotami
      var aggregatedTransactions = [];
      for (var date in sums) {
        aggregatedTransactions.push(sums[date]);
      }
      // Získat posledních 7 hodnot z pole
      var last7Values = aggregatedTransactions.slice(-7);
      // Pokud je méně než 7 hodnot, doplnit nuly ze začátku pole
      while (last7Values.length < 7) {
        last7Values.unshift(0);
      }
      return last7Values;
    }

    // Volání funkce a uložení výsledku do proměnné
    var sumsByDate = sumTransactionsByDate(transfers);

    // Výpis výsledného pole s posledními 7 hodnotami, doplněné nulami při potřebě
    console.log(sumsByDate);
    const myChart1 = new Chart(chart1, {
      type: "bar",
      data: {
        labels: labelsDay,
        datasets: [
          {
            label: "Celková hodnota transakcí",
            data: sumsByDate,
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(20, 122, 237, 1)",
              "rgba(20, 122, 237, 1)",
              "rgba(20, 122, 237, 1)",
              "rgba(20, 122, 237, 1)",
              "rgba(20, 122, 237, 1)",
              "rgba(20, 122, 237, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, // Toto umožní, aby byl graf responzivní
        maintainAspectRatio: false, // Toto umožní, aby graf mohl měnit výšku společně se šířkou
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
});
