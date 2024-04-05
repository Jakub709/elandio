const { Double } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    acctivated: { type: String, default: "no" },

    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    about: { type: String, default: "" },

    job: { type: String, default: "" },
    region: { type: String, default: "" },

    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/zz-profilePic.png" },
    moneyTransfer: { type: Array, default: 100 },
    nameTransfer: { type: Array, default: "Počáteční vklad" },
    dateTransfer: { type: Array, default: new Date() },
    usernameTransfer: { type: Array, default: "banker" },
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
