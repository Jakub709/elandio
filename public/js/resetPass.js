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
const updatePassword = document.getElementById("btn");

// Input fields
const id = document.getElementById("id");
const password = document.getElementById("password");
const passwordConf = document.getElementById("passwordConf");

// Funkce
updatePassword.addEventListener("click", function (e) {
  e.preventDefault();
  const data = {
    id: id.value,
    password: password.value,
    passwordConf: passwordConf.value,
  };
  //console.log(data);
  $.post("/reset-pass", data, (postData, status, xhr) => {
    if (!postData) {
      return;
    } else {
      //console.log(postData);
      id.value = "";
      password.value = "";
      passwordConf.value = "";
      if (postData.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Změna provedena",
          text: "Nové heslo bylo vytvořeno, přihlas se prosím.",
          confirmButtonColor: "#51BE7C",
          confirmButtonText:
            '<a class="loginRedirect" href="/login">Hotovo</a>',
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
