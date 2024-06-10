"use strict";

const sqlite = require("sqlite3");

// open a connection to the database
const db = new sqlite.Database("db/tickets.db", (err) => {
  if (err) throw err;
});

// parse ticket data
const parseTicket = (data) => {
  return {
    ...data,
    state: data.state ? "open" : "closed",
  };
};

// query the database for all tickets
exports.getTickets = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT Tickets.id AS ticket_id, 
              Tickets.owner_id,
              Tickets.state, 
              Tickets.category, 
              Tickets.title, 
              Tickets.timestamp, 
              Tickets.text,
              Users.username AS owner_username
      FROM Tickets
      JOIN Users ON Tickets.owner_id = Users.id;
    `;
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      resolve(rows.map(parseTicket));
    });
  });
};

// query the additional contents of a ticket
exports.getAdditionalContents = (ticketId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
          AC.id AS ac_id,
          AC.author_id,
          AC.timestamp AS ac_timestamp,
          AC.text AS ac_text,
          U.username AS author_username
      FROM 
          AdditionalContents AC
      JOIN 
          Users U ON AC.author_id = U.id
      WHERE 
          AC.ticket_id = ?;
    `;
    db.all(sql, [ticketId], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

// create a new ticket
exports.createTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    const currentTimestamp = new Date().valueOf();
    const sql = `
      INSERT INTO Tickets (owner_id, state, category, title, text, timestamp)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    db.run(
      sql,
      [
        ticket.owner_id,
        1,
        ticket.category,
        ticket.title,
        ticket.text,
        currentTimestamp,
      ],
      function (err) {
        if (err) reject(err);
        resolve(this.lastID);
      },
    );
  });
};

// create a new additional content
exports.createAdditionalContent = (additionalContent) => {
  return new Promise((resolve, reject) => {
    const currentTimestamp = new Date().valueOf();
    const sql = `
      INSERT INTO AdditionalContents (ticket_id, author_id, text, timestamp)
      VALUES (?, ?, ?, ?);
    `;
    db.run(
      sql,
      [
        additionalContent.ticket_id,
        additionalContent.author_id,
        additionalContent.text,
        currentTimestamp,
      ],
      function (err) {
        if (err) reject(err);
        resolve(this.lastID);
      },
    );
  });
};

exports.openTicket = (ticketId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Tickets
      SET state = 1
      WHERE id = ?;
    `;
    db.run(sql, [ticketId], function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

exports.closeTicket = (ticketId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Tickets
      SET state = 0
      WHERE id = ?;
    `;
    db.run(sql, [ticketId], function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

exports.updateCategory = ({ ticketId, category }) => {
  console.log("DAO");
  console.log("ticketId", ticketId);
  console.log("category", category);
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Tickets
      SET category = ?
      WHERE id = ?;
    `;
    db.run(sql, [category, ticketId], function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};
