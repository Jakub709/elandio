const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// $(".nav-profile ul li").click(function () {
//   $(this).addClass("active").siblings().removeClass("active");
// });

// const tabBtn = document.querySelectorAll(".nav-profile ul li");
// const tab = document.querySelectorAll(".tab");

// function tabs(panelIndex) {
//   tab.forEach(function (node) {
//     node.style.display = "none";
//   });
//   tab[panelIndex].style.display = "block";
// }
// tabs(0);

// Tlačítko
const resetPassword = document.querySelector(".btn");

// Input fields
const email = document.getElementById("email");

// Funkce
resetPassword.addEventListener("click", function (e) {
  e.preventDefault();
  const data = {
    email: email.value,
  };
  //console.log(data);
  $.post("/reset-pass-email", data, (postData, status, xhr) => {
    if (!postData) {
      return;
    } else {
      //console.log(postData);
      email.value = "";
      if (postData.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Instrukce odeslány",
          text: "Přejdi do svého emailu a změň si heslo.",
          confirmButtonColor: "#51BE7C",
          confirmButtonText: "Jdu na to",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Pozor chyba",
          text: `${postData.errorMessage}`,
          confirmButtonColor: "#F27474",
          confirmButtonText: "Rozumím",
        });
      }
    }
  });
});
