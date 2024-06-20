"use strict";

const passport = require("../passport/setup");

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
};

exports.getSession = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  return res.status(401).json({ error: "Not Authenticated" });
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.status(200).json({});
  });
};
