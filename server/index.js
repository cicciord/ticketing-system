"use strict";

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const { check } = require("express-validator");

const passport = require("./passport/setup");
const ticketApi = require("./api/ticket-api");
const userApi = require("./api/user-api");

// init express
const app = new express();
const port = 3001;

// enable logging
app.use(morgan("dev"));

// parse the request body
app.use(express.json());

// enable cors
app.use(cors());

// enable session management
app.use(
  session({
    secret: "test secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  }),
);

// init passport
app.use(passport.authenticate("session"));

// TICKETS ROUTES
app.get("/api/tickets", ticketApi.getTickets);
app.get(
  "/api/tickets/:id",
  [check("id").isInt({ min: 1 })],
  ticketApi.getAdditionalContents,
);

app.post("/api/tickets/", ticketApi.createTicket);
app.post(
  "/api/tickets/:id/",
  [check("id").isInt({ min: 1 })],
  ticketApi.createAdditionalContent,
);

app.put(
  "/api/tickets/:id/open",
  [check("id").isInt({ min: 1 })],
  ticketApi.openTicket,
);
app.put(
  "/api/tickets/:id/close",
  [check("id").isInt({ min: 1 })],
  ticketApi.closeTicket,
);
app.put(
  "/api/tickets/:id/category",
  [check("id").isInt({ min: 1 })],
  ticketApi.updateCategory,
);

// USER ROUTES
app.post("/api/login", userApi.login);
app.delete("/api/logout", userApi.logout);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
