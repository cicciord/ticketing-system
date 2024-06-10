"use strict";

const sqlite = require("sqlite3");

const db = new sqlite.Database("db/tickets.db", (err) => {
  if (err) throw err;
});

exports.getUser = (username) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM Users WHERE username = ?;
    `;
    db.get(sql, [username], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}
