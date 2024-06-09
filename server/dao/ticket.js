"use strict";

const sqlite = require("sqlite3");

// open a connection to the database
const db = new sqlite.Database("db/tsys.db", (err) => {
  if (err) throw err;
});

// parse ticket data
const parseTicket = (data) => {};

exports.getTickets = (callback) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tickets";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      // handle rows
      console.log(rows);
    });
  });
};
