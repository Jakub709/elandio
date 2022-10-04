const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    acctivated: { type: String, default: "no" },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    about: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    job: { type: String, default: "" },
    position: { type: String, default: "" },
    hex: { type: String, default: "#147AED" },
    region: { type: String, default: "" },
    locationLatitude: { type: Number },
    locationLongitude: { type: Number },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.png" },
    moneyTransfer: { type: Array, default: 500 },
    nameTransfer: { type: Array, default: "Počáteční vklad" },
    dateTransfer: { type: Array, default: new Date() },
    usernameTransfer: { type: Array, default: "iLandio" },
    followers: { type: Array },
    following: { type: Array },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("accountBalance").get(function () {
  let sum = 0;
  for (let i = 0; i < this.moneyTransfer.length; i++) {
    sum += this.moneyTransfer[i];
  }

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

const User = mongoose.model("User", UserSchema);
module.exports = User;
