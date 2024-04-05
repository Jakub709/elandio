exports.isBanker = (req, res, next) => {
  if (req.session.user.username == "banker") {
    return next();
  } else {
    return res.redirect("/bank");
  }
};
