"use strict";

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const passport = require("./passport/setup");

const ticketApi = require("./api/ticket-api");

// init express
const app = new express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "test secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  }),
);

app.use(passport.authenticate("session"));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Not authorized" });
};

app.get("/api/tickets", ticketApi.getTickets);
app.get("/api/tickets/:id", ticketApi.getAdditionalContents);

app.post("/api/tickets/new", ticketApi.createTicket);
app.post("/api/tickets/:id/new", ticketApi.createAdditionalContent);

app.put("/api/tickets/:id/open", ticketApi.openTicket);
app.put("/api/tickets/:id/close", ticketApi.closeTicket);
app.put("/api/tickets/:id/updatecategory", ticketApi.updateCategory);

app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json({ error: info });
    }
    // success, perform the login and extablish a login session
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser() in LocalStratecy Verify Fn
      return res.json(req.user);
    });
  })(req, res, next);
});

// GET /api/sessions/current
// This route checks whether the user is logged in or not.
app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Not authenticated" });
});

// DELETE /api/session/current
// This route is used for loggin out the current user.
app.delete("/api/sessions/current", (req, res) => {
  req.logout(() => {
    res.status(200).json({});
  });
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
