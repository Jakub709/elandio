$(".nav-profile ul li").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
});

const tabBtn = document.querySelectorAll(".nav-profile ul li");
const tab = document.querySelectorAll(".tab");

function tabs(panelIndex) {
  tab.forEach(function (node) {
    node.style.display = "none";
  });
  tab[panelIndex].style.display = "block";
}
tabs(0);

// Tlačítka
const updateMain = document.getElementById("updateMain");
const updatePassword = document.getElementById("updatePassword");
const updateAbout = document.getElementById("updateAbout");

// Input fields
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConf = document.getElementById("passwordConf");
const locationLatitude = document.getElementById("locationLatitude");
const locationLongitude = document.getElementById("locationLongitude");
const facebook = document.getElementById("facebook");
const linkedin = document.getElementById("linkedin");
const github = document.getElementById("github");
const job = document.getElementById("job");
const position = document.getElementById("position");
const region = document.getElementById("region");
const hex = document.getElementById("hex");
const pfoto = document.querySelector(".avatar");

// DOM loaded
document.addEventListener("DOMContentLoaded", function (event) {
  $.get("/my-profile-update", (getData) => {
    name.value = getData.userLoggedIn.name;
    email.value = getData.userLoggedIn.email;
    about.textContent = getData.userLoggedIn.about;
    locationLatitude.value = getData.userLoggedIn.locationLatitude;
    locationLongitude.value = getData.userLoggedIn.locationLongitude;
    facebook.value = getData.userLoggedIn.facebook;
    linkedin.value = getData.userLoggedIn.linkedin;
    github.value = getData.userLoggedIn.github;
    job.value = getData.userLoggedIn.job;
    position.value = getData.userLoggedIn.position;
    region.value = getData.userLoggedIn.region;
    hex.value = getData.userLoggedIn.hex;
    pfoto.src = getData.userLoggedIn.profilePic;
    //console.log(Date.now());
  });
});

// Funkce
updateMain.addEventListener("click", function (e) {
  e.preventDefault();
  const data = {
    name: name.value,
    email: email.value,
    facebook: facebook.value,
    linkedin: linkedin.value,
    github: github.value,
    job: job.value,
    position: position.value,
    region: region.value,
    hex: hex.value,
  };
  $.post("/my-profile-update-main", data, (postData, status, xhr) => {
    if (!postData) {
      return;
    } else {
      name.value = postData.userLoggedIn.name;
      email.value = postData.userLoggedIn.email;
      facebook.value = postData.userLoggedIn.facebook;
      linkedin.value = postData.userLoggedIn.linkedin;
      github.value = postData.userLoggedIn.github;
      job.value = postData.userLoggedIn.job;
      position.value = postData.userLoggedIn.position;
      region.value = postData.userLoggedIn.region;
      hex.value = postData.userLoggedIn.hex;

      if (postData.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Změna provedena",
          text: "Profil byl úspěšně aktualizován.",
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

updatePassword.addEventListener("click", function (e) {
  e.preventDefault();
  const data = {
    password: password.value,
    passwordConf: passwordConf.value,
  };
  //console.log(data);
  $.post("/my-profile-update-password", data, (postData, status, xhr) => {
    if (!postData) {
      return;
    } else {
      password.value = "";
      passwordConf.value = "";
      if (postData.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Změna provedena",
          text: "Nové heslo bylo uloženo.",
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

updateAbout.addEventListener("click", function (e) {
  e.preventDefault();
  const data = {
    about: about.value,
    locationLatitude: locationLatitude.value,
    locationLongitude: locationLongitude.value,
  };
  $.post("/my-profile-update-about", data, (postData, status, xhr) => {
    if (!postData) {
      return;
    } else {
      about.value = postData.userLoggedIn.about;
      locationLatitude.value = postData.userLoggedIn.locationLatitude;
      locationLongitude.value = postData.userLoggedIn.locationLongitude;
      if (postData.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Změna provedena",
          text: "Tvůj nový popis byl uložen.",
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

let cropper;

const filePhoto = document.getElementById("filePhoto");
filePhoto.addEventListener("change", function (event) {
  const fileSize = this.files[0].size / 1024;
  if (this.files && this.files[0] && fileSize <= 500) {
    var reader = new FileReader();
    reader.onload = (e) => {
      var image = document.getElementById("imagePreview");
      image.src = e.target.result;

      if (cropper !== undefined) {
        cropper.destroy();
      }

      cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        background: false,
      });
    };
    reader.readAsDataURL(this.files[0]);
  } else {
    Swal.fire({
      icon: "error",
      title: "Pozor chyba",
      text: `Soubor je příliš veliký. Maximální velikost je 500 kB.`,
      confirmButtonColor: "#F27474",
      confirmButtonText: "Rozumím",
    });
  }
});

$("#imageUploadButton").click(() => {
  var canvas = cropper.getCroppedCanvas();

  if (canvas == null) {
    alert("Could not upload image. Make sure it is an image file.");
    return;
  }

  canvas.toBlob((blob) => {
    var formData = new FormData();
    formData.append("croppedImage", blob);

    $.ajax({
      url: "/api/users/profilePicture",
      type: "POST",
      data: formData,
      // nechci transformaci do stringu
      processData: false,
      contentType: false,
      success: () => location.reload(),
    });
  });
});
