const express = require("express");
const app = express();
require("dotenv").config();

exports.requireAdmin = async (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user._id === process.env.JAKUBID) {
      return next();
    } else {
      return res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
};
