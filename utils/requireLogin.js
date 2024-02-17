exports.requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

exports.isLoggedIN = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect("/posts-list");
  } else {
    return next();
  }
};
