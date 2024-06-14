const jsonwebtoken = require("jsonwebtoken");

const jwtSecret =
  "qTX6walIEr47p7iXtTgLxDTXJRZYDC9egFjGLIn0rRiahB4T24T4d5f59CtyQmH8";
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
