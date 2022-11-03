const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    users: { type: Array, default: 500 },
    posts: { type: Array, default: 500 },
    transactions: { type: Array, default: 500 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
