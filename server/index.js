"use strict";

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const { param, checkSchema } = require("express-validator");
require("dotenv").config();

const passport = require("./passport/setup");
const ticketApi = require("./api/ticket-api");
const userApi = require("./api/user-api");
const jwtApi = require("./api/jwt-api");
const { ticketSchema, additionalContentSchema } = require("./validator");

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

// middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Not authorized" });
};

// middleware to check if the user is logged in as an admin
const isLoggedInAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  return res.status(401).json({ error: "Not authorized" });
};

// TICKETS ROUTES
app.get("/api/tickets", ticketApi.getTickets);
app.get(
  "/api/tickets/:id",
  [param("id").isInt({ min: 1 })],
  isLoggedIn,
  ticketApi.getAdditionalContents,
);

app.post(
  "/api/tickets/",
  [checkSchema(ticketSchema, ["body"])],
  isLoggedIn,
  ticketApi.createTicket,
);
app.post(
  "/api/tickets/:id/",
  [
    param("id").isInt({ min: 1 }),
    checkSchema(additionalContentSchema, ["body"]),
    isLoggedIn,
  ],
  ticketApi.createAdditionalContent,
);

app.put(
  "/api/tickets/:id/open",
  [param("id").isInt({ min: 0 })],
  isLoggedInAdmin,
  ticketApi.openTicket,
);
app.put(
  "/api/tickets/:id/close",
  [param("id").isInt({ min: 1 })],
  isLoggedIn,
  ticketApi.closeTicket,
);
app.put(
  "/api/tickets/:id/category",
  [param("id").isInt({ min: 1 })],
  isLoggedInAdmin,
  ticketApi.updateCategory,
);

// USER ROUTES
app.post("/api/sessions", userApi.login);
app.get("/api/sessions/current", userApi.getSession);
app.delete("/api/sessions/current", userApi.logout);

// JWT ROUTES
app.get("/api/auth-token", isLoggedIn, jwtApi.getToken);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
