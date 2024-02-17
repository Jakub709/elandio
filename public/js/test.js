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
      const imagePreviewContainer = document.getElementById(
        "imagePreviewContainer"
      );
      imagePreviewContainer.classList.remove("img-area");
      const uploadIcon = document.getElementById("upload-icon");
      uploadIcon.remove();
      const uploadText = document.getElementById("upload-text");
      uploadText.remove();
      const uploadText2 = document.getElementById("upload-text-2");
      uploadText2.remove();
      // const img = document.createElement("img");
      //img.src = imgUrl;
      // imgArea.appendChild(img);
      // imgArea.classList.add("active");
      // imgArea.dataset.img = image.name;
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

      // $.ajax({
      //   url: "/posts-list-test",
      //   type: "POST",
      //   data: formData,
      //   // nechci transformaci do stringu
      //   processData: false,
      //   contentType: false,
      //   success: () => location.reload(),
      // });
      console.log("canvas");
    },
    "image/jpeg",
    0.2
  );
  console.log("nazdar");
});
