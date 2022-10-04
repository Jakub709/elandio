const submitButton = document.querySelector(".button-1");
const postTitle = document.getElementById("title");
const postContent = document.getElementById("content");
const postPrice = document.getElementById("price");
const postType = document.getElementById("type");
const postCategory = document.getElementById("category");
const postLevel = document.getElementById("level");
const postGroup = document.getElementById("group");
const postEnvironment = document.getElementById("environment");
const myPostsContainer = document.querySelector(".my-posts-container");
const type = document.getElementById("type");
const category = document.getElementById("category");
const level = document.getElementById("level");
const group = document.getElementById("group");
const environment = document.getElementById("environment");

const confirmPopUp = function (link) {
  Swal.fire({
    icon: "question",
    title: "Pozor",
    text: "Chceš příspěvek skutečně smazat?",
    showCancelButton: true,
    confirmButtonText: "Smazat",
    cancelButtonText: "Rozhodně ne",
    confirmButtonColor: "#147aed",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      window.location.href = link;
    }
  });
};

const createNewPost = function (postData) {
  const html = `<div class="my-post">
  <div class="grid grid--2-cols-post">
    <div class="my-post-mainImage">
      <img
        src="${postData.postedByProfilePic}"
        alt="user"
      />
    </div>
    <div class="my-post-body">
      <h4>${postData.title}</h4>
      <i>${postData.time}</i>
      <p class="my-post-content">${postData.content}</p>
    </div>
  </div>

  <div class="my-post-about">
    <div class="my-post-tags grid grid--6-cols">
      <span class="tag tag-one">${postData.type}</span>
      <span class="tag tag-one">${postData.category}</span>
      <span class="tag tag-two">${postData.level}</span>
      <span class="tag tag-two">${postData.group}</span>
      <span class="tag tag-two">${postData.environment}</span>
      <span class="tag tag-three">${postData.price} EC</span>
    </div>
  </div>
    <div class="my-post-delete">
    <a onclick=confirmPopUp("/post-delete/${postData._id}")>🗑️</a>
  </div>
  </div>`;
  myPostsContainer.insertAdjacentHTML("afterbegin", html);
};

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Starý způsob s radio button
  // let type;
  // for (const radioButton of type) {
  //   if (radioButton.checked) {
  //     type = radioButton.value;
  //     break;
  //   }
  // }

  if (
    !postTitle.value ||
    !postContent.value ||
    !postPrice.value ||
    !type.value ||
    !category.value ||
    !level.value ||
    !group.value ||
    !environment.value
  ) {
    Swal.fire({
      icon: "error",
      title: "Pozor chyba",
      text: `Vyplň prosím všechna pole.`,
      confirmButtonColor: "#F27474",
      confirmButtonText: "Rozumím",
    });
    return;
  } else {
    const data = {
      title: postTitle.value,
      content: postContent.value,
      price: postPrice.value,
      type: type.value,
      category: category.value,
      level: level.value,
      group: group.value,
      environment: environment.value,
    };
    postTitle.value = "";
    postContent.value = "";
    postPrice.value = "";
    postType.value = "";
    postCategory.value = "";
    postLevel.value = "";
    postGroup.value = "";
    postContent.value = "";
    postEnvironment.value = "";

    $.post("/my-posts", data, (postData, status, xhr) => {
      if (!postData) {
        Swal.fire({
          icon: "error",
          title: "Chyba",
          text: `Zkuste to prosím znovu.`,
          confirmButtonColor: "#F27474",
          confirmButtonText: "Rozumím",
        });
        return;
      } else if (postData.status === "fail") {
        Swal.fire({
          icon: "error",
          title: "Neaktivní účet",
          text: postData.errorMessage,
          confirmButtonColor: "#F27474",
          confirmButtonText: "Rozumím",
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Vše v pořádku",
          text: `${postData.newPost.type} byla úspěšně vytvořena.`,
          confirmButtonColor: "#51BE7C",
          confirmButtonText: "Hotovo",
        });
        createNewPost(postData.newPost);
      }
    });
  }
});
