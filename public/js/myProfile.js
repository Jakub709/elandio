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
const isNotification = document.getElementById("isNotification");
const password = document.getElementById("password");
const passwordConf = document.getElementById("passwordConf");
// const locationLatitude = document.getElementById("locationLatitude");
// const locationLongitude = document.getElementById("locationLongitude");
const facebook = document.getElementById("facebook");
const linkedin = document.getElementById("linkedin");
const instagram = document.getElementById("instagram");
const faculty = document.getElementById("faculty");
const fieldOfStudy = document.getElementById("fieldOfStudy");
const region = document.getElementById("region");

const pfoto = document.querySelector(".avatar");

// DOM loaded
document.addEventListener("DOMContentLoaded", function (event) {
  $.get("/my-profile-update", (getData) => {
    name.value = getData.userLoggedIn.name;
    isNotification.value = getData.userLoggedIn.isNotification;
    about.textContent = getData.userLoggedIn.about;
    // locationLatitude.value = getData.userLoggedIn.locationLatitude;
    // locationLongitude.value = getData.userLoggedIn.locationLongitude;
    facebook.value = getData.userLoggedIn.facebook;
    linkedin.value = getData.userLoggedIn.linkedin;
    instagram.value = getData.userLoggedIn.instagram;
    faculty.value = getData.userLoggedIn.faculty;
    fieldOfStudy.value = getData.userLoggedIn.fieldOfStudy;
    region.value = getData.userLoggedIn.region;

    pfoto.src = getData.userLoggedIn.profilePic;
    //console.log(Date.now());
  });
});

// Funkce
updateMain.addEventListener("click", function (e) {
  e.preventDefault();

  const data = {
    name: name.value,
    isNotification: isNotification.value,
    facebook: facebook.value,
    linkedin: linkedin.value,
    instagram: instagram.value,
    faculty: faculty.value,
    fieldOfStudy: fieldOfStudy.value,
    region: region.value,
  };
  console.log(data);
  $.post("/my-profile-update-general", data, (postData, status, xhr) => {
    if (!postData) {
      Swal.fire({
        icon: "error",
        title: "Pozor chyba",
        text: `Zkuste to prosím znovu.`,
        confirmButtonColor: "#F27474",
        confirmButtonText: "Rozumím",
      });
    } else {
      name.value = postData.userLoggedIn.name;
      isNotification.value = postData.userLoggedIn.isNotification;
      facebook.value = postData.userLoggedIn.facebook;
      linkedin.value = postData.userLoggedIn.linkedin;
      instagram.value = postData.userLoggedIn.instagram;
      faculty.value = postData.userLoggedIn.faculty;
      fieldOfStudy.value = postData.userLoggedIn.fieldOfStudy;
      region.value = postData.userLoggedIn.region;

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
    // locationLatitude: locationLatitude.value,
    // locationLongitude: locationLongitude.value,
  };
  $.post("/my-profile-update-about", data, (postData, status, xhr) => {
    if (!postData) {
      return;
    } else {
      about.value = postData.userLoggedIn.about;
      // locationLatitude.value = postData.userLoggedIn.locationLatitude;
      // locationLongitude.value = postData.userLoggedIn.locationLongitude;
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

let filePhoto = document.getElementById("filePhoto");

console.log(filePhoto);
filePhoto.addEventListener("change", function (event) {
  const fileSize = this.files[0].size / 1024;
  console.log(fileSize);
  if (this.files && this.files[0] && fileSize <= 11264) {
    var reader = new FileReader();
    reader.onload = (e) => {
      var image = document.getElementById("imagePreview");
      console.log(image);
      image.src = e.target.result;
      console.log(image.src);
      if (cropper !== undefined) {
        cropper.destroy();
      }

      cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        background: false,
      });
      console.log(cropper);
    };
    reader.readAsDataURL(this.files[0]);
  } else {
    Swal.fire({
      icon: "error",
      title: "Pozor chyba",
      text: `Soubor je příliš veliký. Maximální velikost je 10 MB.`,
      confirmButtonColor: "#F27474",
      confirmButtonText: "Rozumím",
    });
  }
});

$("#imageUploadButton").click(() => {
  const canvas = cropper.getCroppedCanvas();

  if (canvas == null) {
    alert("Could not upload image. Make sure it is an image file.");
    return;
  }

  canvas.toBlob(
    (blob) => {
      var formData = new FormData();
      formData.append("croppedImage", blob);
      console.log(canvas);

      $.ajax({
        url: "/api/users/profilePicture",
        type: "POST",
        data: formData,
        // nechci transformaci do stringu
        processData: false,
        contentType: false,
        success: () => location.reload(),
      });
    },
    "image/jpeg",
    0.2
  );
});
