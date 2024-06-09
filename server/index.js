"use strict";

const express = require("express");
const cors = require("cors");

const ticketApi = require("./api/ticket-api");

// init express
const app = new express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/tickets", ticketApi.getTickets);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
