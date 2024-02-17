const mongoose = require("mongoose");
require("dotenv").config();

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(process.env.MONGODB)
      .then(() => console.log("Database is connected"))
      .catch((err) => console.log("Database connnection error: " + err));
  }
}

module.exports = new Database();
