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
app.get("/api/tickets/:id", ticketApi.getAdditionalContents);

app.post("/api/tickets/new", ticketApi.createTicket);
app.post("/api/tickets/:id/new", ticketApi.createAdditionalContent);

app.put("/api/tickets/:id/open", ticketApi.openTicket);
app.put("/api/tickets/:id/close", ticketApi.closeTicket);
app.put("/api/tickets/:id/updatecategory", ticketApi.updateCategory);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
