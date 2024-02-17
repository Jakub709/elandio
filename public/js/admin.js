const chart1 = document.getElementById("myChart1").getContext("2d");
const chart2 = document.getElementById("myChart2").getContext("2d");

const currentDate = new Date();
const day = currentDate.getDay();
console.log(day);

// if (day === 0) {
//   labelsDay =
//     "neděle",
//     "pondělí",
//     "úterý",
//     "středa",
//     "čtvrtek",
//     "pátek",
//     "sobota",
//   ;
// } else if (day === 1) {
//   labelsDay =
//     "pondělí",
//     "úterý",
//     "středa",
//     "čtvrtek",
//     "pátek",
//     "sobota",
//     "neděle",
//   ;
// } else if (day === 2) {
//   labelsDay =
//     "úterý",
//     "středa",
//     "čtvrtek",
//     "pátek",
//     "sobota",
//     "neděle",
//     "pondělí";
// } else if (day === 3) {
//   labelsDay =
//     "středa",
//     "čtvrtek",
//     "pátek",
//     "sobota",
//     "neděle",
//     "pondělí",
//     "úterý";
// } else if (day === 4) {
//   labelsDay =
//     "čtvrtek",
//     "pátek",
//     "sobota",
//     "neděle",
//     "pondělí",
//     "úterý",
//     "středa",;
// } else if (day === 5) {
//   labelsDay =
//     "pátek",
//     "sobota",
//     "neděle",
//     "pondělí",
//     "úterý",
//     "středa",
//     "čtvrtek";
// } else if (day === 6) {
//   labelsDay =
//     "úterý",
//     "středa",
//     "čtvrtek",
//     "pátek",
//     "sobota",
//     "neděle",
//     "pondělí";
// }

let labelsDay;
if (day === 0) {
  labelsDay = "neděle";
} else if (day === 1) {
  labelsDay = "pondělí";
} else if (day === 2) {
  labelsDay = "úterý";
} else if (day === 3) {
  labelsDay = "středa";
} else if (day === 4) {
  labelsDay = "čtvrtek";
} else if (day === 5) {
  labelsDay = "pátek";
} else if (day === 6) {
  labelsDay = "sobota";
}

console.log(labelsDay);

const myChart1 = new Chart(chart1, {
  type: "bar",
  data: {
    labels: labelsDay,
    datasets: [
      {
        label: "Počet nových uživatelů",
        data: [12, 19, 3, 5, 2, 3, 5],
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

const myChart2 = new Chart(chart2, {
  type: "bar",
  data: {
    labels: labelsDay,
    datasets: [
      {
        label: "Počet nových uživatelů",
        data: [12, 19, 3, 5, 2, 3, 5],
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

// new Chart(document.getElementById("line-chart"), {
//   type: "line",
//   data: {
//     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
//     datasets: [
//       {
//         data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
//         label: "Africa",
//         borderColor: "#3e95cd",
//         fill: false,
//       },
//       {
//         data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
//         label: "Asia",
//         borderColor: "#8e5ea2",
//         fill: false,
//       },
//       {
//         data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
//         label: "Europe",
//         borderColor: "#3cba9f",
//         fill: false,
//       },
//       {
//         data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
//         label: "Latin America",
//         borderColor: "#e8c3b9",
//         fill: false,
//       },
//       {
//         data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
//         label: "North America",
//         borderColor: "#c45850",
//         fill: false,
//       },
//     ],
//   },
//   options: {
//     title: {
//       display: true,
//       text: "World population per region (in millions)",
//     },
//   },
// });

// new Chart(document.getElementById("pie-chart"), {
//   type: "pie",
//   data: {
//     labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//     datasets: [
//       {
//         label: "Population (millions)",
//         backgroundColor: [
//           "#3e95cd",
//           "#8e5ea2",
//           "#3cba9f",
//           "#e8c3b9",
//           "#c45850",
//         ],
//         data: [2478, 5267, 734, 784, 433],
//       },
//     ],
//   },
//   options: {
//     title: {
//       display: true,
//       text: "Predicted world population (millions) in 2050",
//     },
//   },
// });
