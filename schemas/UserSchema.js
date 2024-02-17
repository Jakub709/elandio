const { Double } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    acctivated: { type: String, default: "no" },
    isNotification: { type: String, default: "povoleno" },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    about: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    faculty: { type: String, default: "" },
    fieldOfStudy: { type: String, default: "Nový uživatel" },
    region: { type: String, default: "" },
    locationLatitude: { type: Number },
    locationLongitude: { type: Number },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/zz-profilePic.png" },
    moneyTransfer: { type: Array, default: 100 },
    nameTransfer: { type: Array, default: "Počáteční vklad" },
    dateTransfer: { type: Array, default: new Date() },
    usernameTransfer: { type: Array, default: "elandio" },
    followers: { type: Array },
    following: { type: Array },
    postsCounter: { type: Number, default: 0 },
    notifications: {
      type: Array,
      default: {
        id: "63eb514b40527e8fdb9eba2b",
        foto: "/images/zz-profilePic.png",
        name: "Elandio",
        text: "tě vítá.",
        date: new Date().toLocaleDateString(),
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("accountBalance").get(function () {
  let sum = 0;
  for (let i = 0; i < this.moneyTransfer.length; i++) {
    sum += this.moneyTransfer[i];
  }

  return sum;
});

UserSchema.virtual("accountCosts").get(function () {
  let sum = 0;
  // for (let i = 0; i < this.moneyTransfer.length; i++) {
  //   // if (this.moneyTransfer[i] < 0) {
  //   //   sum += this.moneyTransfer[i];
  //   // }
  //   sum += this.moneyTransfer[i];
  // }

  return sum;
});

UserSchema.virtual("followersCounter").get(function () {
  const counter = this.followers.length;
  return counter;
});

UserSchema.virtual("followingCounter").get(function () {
  const counter = this.following.length;
  return counter;
});

UserSchema.virtual("facultyNameCSS").get(function () {
  let facultyNameCSS = "";
  if (this.faculty === "") {
    facultyNameCSS = "noFacultyName";
  } else if (this.faculty === "PřF MU") {
    facultyNameCSS = "prirodaMU";
  } else {
    facultyNameCSS = this.faculty.replace(/\s+/g, "").toLowerCase();
  }
  return facultyNameCSS;
});

UserSchema.virtual("facultyColor").get(function () {
  let color;

  if (this.faculty === "ESF MU") {
    color = "#C50069";
  } else if (this.faculty === "FaF MU") {
    color = "#527488";
  } else if (this.faculty === "FF MU") {
    color = "#5CB4E1";
  } else if (this.faculty === "FI MU") {
    color = "#F8DA08";
  } else if (this.faculty === "FSpS MU") {
    color = "#74B8AA";
  } else if (this.faculty === "FSS MU") {
    color = "#3D885A";
  } else if (this.faculty === "LF MU") {
    color = "#C62326";
  } else if (this.faculty === "PdF MU") {
    color = "#CE661D";
  } else if (this.faculty === "PrF MU") {
    color = "#8F448E";
  } else if (this.faculty === "PřF MU") {
    color = "#5AA353";
  } else {
    color = "#1165BF";
  }
  return color;
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
