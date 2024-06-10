"use strict";

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const passport = require("./passport/setup");
const ticketApi = require("./api/ticket-api");
const userApi = require("./api/user-api");

// init express
const app = new express();
const port = 3001;

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
app.get("/api/tickets/:id", ticketApi.getAdditionalContents);

app.post("/api/tickets/new", ticketApi.createTicket);
app.post("/api/tickets/:id/new", ticketApi.createAdditionalContent);

app.put("/api/tickets/:id/open", ticketApi.openTicket);
app.put("/api/tickets/:id/close", ticketApi.closeTicket);
app.put("/api/tickets/:id/updatecategory", ticketApi.updateCategory);

// USER ROUTES
app.post("/api/login", userApi.login);
app.delete("/api/logout", userApi.logout);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
