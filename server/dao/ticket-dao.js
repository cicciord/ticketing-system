"use strict";

const sqlite = require("sqlite3");

// open a connection to the database
const db = new sqlite.Database("db/TicSys.db", (err) => {
  if (err) throw err;
});

// parse ticket data
const parseTicket = (data) => {
  return {
    ...data,
    state: data.state ? "open" : "closed",
  };
};

exports.getTickets = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tickets ORDER BY timestamp DESC";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      resolve(rows.map(parseTicket));
    });
  });
};
