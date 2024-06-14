"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { query, validationResult } = require("express-validator");
const { expressjwt } = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");

const jwtSecret =
  "qTX6walIEr47p7iXtTgLxDTXJRZYDC9egFjGLIn0rRiahB4T24T4d5f59CtyQmH8";

// init express
const app = new express();
const port = 3002;

app.use(morgan("dev"));

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  expressjwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
  }),
);

app.use(function (err, _, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      errors: [{ param: "Server", msg: "Authorization error", path: err.code }],
    });
  } else {
    next();
  }
});

app.get(
  "/api/estimation",
  [query("title").isString(), query("category").isString()],
  (req, res) => {
    const err = validationResult(req);
    const errList = [];
    if (!err.isEmpty()) {
      errList.push(...err.errors.map((e) => e.msg));
      return res.status(400).json({ errors: errList });
    }

    const admin = req.auth?.admin;

    const { title, category } = req.query;

    const titleSum = title.replace(/\s/g, "").length;
    const categorySum = category.replace(/\s/g, "").length;
    const total = titleSum + categorySum;

    const estimation = total * 10 + Math.floor(Math.random() * 240) + 1;

    if (admin) {
      return res.json({
        estimation,
      });
    } else {
      return res.json({
        estimation: Math.floor(estimation / 24) * 24,
      });
    }
  },
);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
