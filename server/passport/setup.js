"use strict";

const passport = require("passport");
const { scrypt, timingSafeEqual } = require("crypto");
const LocalStrategy = require("passport-local");

const userDao = require("../dao/user-dao");

async function verify(username, password, cb) {
  const user = await userDao.getUser(username);

  if (!user) {
    return cb(null, false, { message: "Username or password is incorrect" });
  }

  scrypt(password, user.salt, 64, (err, hash) => {
    if (err) {
      return cb(err);
    }

    if (!timingSafeEqual(Buffer.from(user.password, "hex"), hash)) {
      return cb(null, false, { message: "Username or password is incorrect" });
    } else {
      return cb(null, {
        id: user.id,
        username: user.username,
        admin: user.admin ? true : false,
      });
    }
  });
}

passport.use(new LocalStrategy(verify));

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (user, callback) {
  return callback(null, user);
});

module.exports = passport;
