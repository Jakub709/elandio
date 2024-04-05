const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    adminName: { type: String },
    dateTransactions: { type: Array },
    valueTransactions: { type: Array },
    senderTransactions: { type: Array },
    receiverTransactions: { type: Array },
    dateNewUsers: { type: Array },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
