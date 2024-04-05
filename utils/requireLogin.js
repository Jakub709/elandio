exports.requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

exports.isLoggedIN = (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user.username == "banker") {
      return res.redirect("/admin-secret-page");
    } else {
      return res.redirect("/bank");
    }

    return res.redirect("/bank");
  } else {
    return next();
  }
};
