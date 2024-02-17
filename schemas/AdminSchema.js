const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    adminName: { type: String },
    dateTransactions: { type: Array },
    valueTransactions: { type: Array },
    dateNewUsers: { type: Array },
    dateNewPosts: { type: Array },
    dateNewFollowers: { type: Array },
    dateNewLogins: { type: Array },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

AdminSchema.virtual("dateNewFollowersCounter").get(function () {
  let followers = this.dateNewFollowers.length;
  return followers;
});

AdminSchema.virtual("dateNewLoginsCounter").get(function () {
  let logins = this.dateNewLogins.length;
  return logins;
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
