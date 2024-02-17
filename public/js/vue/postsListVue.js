// Vue app
const app = Vue.createApp({
  data() {
    return {
      profileSelected: false,
      id: "",
      name: "",
      username: "",
      faculty: "",
      about: "",
      profilePic: "",
      posts: "",
      following: "",
      followers: "",
      fieldOfStudy: "",
      profilePage: "",
      loggedInUserId: "",
      loggedInUserName: "",
      loggedInUserProfilePic: "",
      postTitle: "",
    };
  },
  methods: {
    async seeProfile(id, title) {
      if (this.profileSelected == false) {
        this.profileSelected = true;
      }
      // Proměnná kvůli sidebaru - title
      this.postTitle = title;

      const userProfileSearchString = `user-profile-sidebar/${id}`;

      $.get(userProfileSearchString, (postData, status, xhr) => {
        const start = Date.now();
        if (!postData) {
          return;
        } else {
          const screenSize = window.outerWidth;

          if (screenSize < 1201) {
            console.log(screenSize);
            // Swal.fire({
            //   title: postData.userProfile.name,
            //   text: postData.userProfile.about,
            //   imageUrl: postData.userProfile.profilePic,
            //   imageAlt: "Custom image",
            //   showCloseButton: true,
            //   confirmButtonColor: "#1165BF",
            //   confirmButtonText: "Zpráva",
            // });
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "sweet-alert_1",
                cancelButton: "sweet-alert_2",
              },
              buttonsStyling: false,
            });

            swalWithBootstrapButtons
              .fire({
                title: `${postData.userProfile.name}<br><a href="/user-profile/${postData.userProfile._id}">@${postData.userProfile.username}</a>`,
                text:
                  postData.userProfile.about ||
                  `Ahoj, jmenuji se ${postData.userProfile.name} a studuji na ${postData.userProfile.faculty}.`,
                imageUrl: postData.userProfile.profilePic,
                showCancelButton: true,
                confirmButtonText: "Hlásím se ✋",
                cancelButtonText: "Zpráva",
                reverseButtons: true,
                showCloseButton: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  console.log("úspěch result confirmed");
                  this.id = postData.userProfile._id;
                  this.loggedInUserId = postData.loggedInUserProfile._id;
                  this.loggedInUserName = postData.loggedInUserProfile.name;
                  this.loggedInUserProfilePic =
                    postData.loggedInUserProfile.profilePic;
                  const data = {
                    receiverId: this.id,
                    senderId: this.loggedInUserId,
                    foto: this.loggedInUserProfilePic,
                    name: this.loggedInUserName,
                    text: `označil příspěvek: ${title}.`,
                    date: new Date().toLocaleDateString(),
                  };

                  console.log(data);

                  $.post("/notifications", data, (postData, status, xhr) => {
                    if (!postData) {
                      Swal.fire(
                        "Chyba",
                        "Notifikace bohužel nebyla odeslána. Zkuste to prosím znovu.",
                        "fail"
                      );
                    } else {
                      console.log("notifikace");
                      Swal.fire(
                        "Odesláno",
                        "Notifikace byla uživateli úspěšně odeslána.",
                        "success"
                      );
                    }
                  });
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  // swalWithBootstrapButtons.fire(
                  //   "Cancelled",
                  //   "Your imaginary file is safe :)",
                  //   "error"
                  // );
                  window.location.href = `/messages/${postData.userProfile.id}`;
                }
              });
          } else {
            this.id = postData.userProfile._id;
            this.name = postData.userProfile.name;
            this.username = postData.userProfile.username;
            this.faculty = postData.userProfile.faculty
              ? postData.userProfile.faculty
              : "MUNI";
            this.about = postData.userProfile.about
              ? postData.userProfile.about
              : `Ahoj, jmenuji se ${this.name} a studuji na ${this.faculty}.`;
            this.profilePic = postData.userProfile.profilePic;
            this.posts = postData.userProfile.postsCounter
              ? postData.userProfile.postsCounter
              : 0;
            this.following = postData.userProfile.followingCounter;
            this.followers = postData.userProfile.followersCounter;
            this.fieldOfStudy =
              postData.userProfile.fieldOfStudy || "Nový uživatel";
            this.profilePage = `location.href = "/user-profile/${this.id}"`;
            this.sendMessage = `location.href = "/messages/${this.id}"`;
            // this.sendMessage = `/messages/${this.id}`;
            // Kvůli notifikaci
            this.loggedInUserId = postData.loggedInUserProfile._id;
            this.loggedInUserName = postData.loggedInUserProfile.name;
            this.loggedInUserProfilePic =
              postData.loggedInUserProfile.profilePic;
            const millis = Date.now() - start;
            console.log(millis);
          }
        }
      });
    },
    // Notifikace sidebar
    sendNotificationBigScreen() {
      const data = {
        receiverId: this.id,
        senderId: this.loggedInUserId,
        foto: this.loggedInUserProfilePic,
        name: this.loggedInUserName,
        text: `označil(a) příspěvek: ${this.postTitle}. `,
        date: new Date().toLocaleDateString(),
      };
      console.log(data);
      $.post("/notifications", data, (postData, status, xhr) => {
        if (!postData) {
          Swal.fire(
            "Chyba",
            "Notifikace bohužel nebyla odeslána. Zkuste to prosím znovu.",
            "fail"
          );
        } else {
          console.log("notifikace");
          Swal.fire(
            "Odesláno",
            `Notifikace byla uživateli ${this.name} úspěšně odeslána.`,
            "success"
          );
        }
      });
    },
  },
  computed: {},
  watch: {},
});

app.mount("#app");
