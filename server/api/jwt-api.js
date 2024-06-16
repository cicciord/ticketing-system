const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
const expireTime = 60;

exports.getToken = (req, res) => {
  const admin = req.user.admin;

  const token = jsonwebtoken.sign({ admin }, jwtSecret, {
    expiresIn: expireTime,
    jwtid: Math.random().toString(36).substring(7),
    subject: req.user.id.toString(),
  });

  res.json({ token });
};
