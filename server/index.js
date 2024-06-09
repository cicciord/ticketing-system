'use strict';

const express = require('express');
const { getTickets } = require('./dao/ticket');

// init express
const app = new express();
const port = 3001;

getTickets().then((tickets) => console.log(tickets));

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
