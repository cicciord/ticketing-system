"use strict";

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const passport = require("./passport/setup");

const { ticketRoutes, sessionRoutes, jwtRoutes } = require("./routes");

// init express
const app = new express();
const port = 3001;

// enable logging
app.use(morgan("dev"));

// parse the request body
app.use(express.json());

// enable cors
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// enable session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  }),
);

// init passport
app.use(passport.authenticate("session"));

// routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/auth-token", jwtRoutes);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
