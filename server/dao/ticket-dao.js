"use strict";

const sqlite = require("sqlite3");
const dayjs = require("dayjs");

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
      JOIN Users ON Tickets.owner_id = Users.id
      ORDER BY Tickets.timestamp DESC;
    `;
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      if (!rows) {
        reject(new Error("No tickets found"));
        return;
      }
      resolve(rows.map(parseTicket));
    });
  });
};

exports.getTicketOwnerId = (ticketId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT owner_id
      FROM Tickets
      WHERE id = ?;
    `;
    db.get(sql, [ticketId], (err, row) => {
      if (err) reject(err);
      if (!row) reject(new Error("Ticket not found"));
      resolve(row.owner_id);
    });
  });
};

exports.getTicketState = (ticketId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT state
      FROM Tickets
      WHERE id = ?;
    `;
    db.get(sql, [ticketId], (err, row) => {
      if (err) reject(err);
      resolve(row?.state === 1 ? "open" : "closed");
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
          AC.ticket_id = ?
      ORDER BY AC.timestamp ASC;
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
    const currentTimestamp = dayjs().unix();
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
    const currentTimestamp = dayjs().unix();
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
      if (this.changes === 0) reject(new Error("Ticket not found"));
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
      if (this.changes === 0) reject(new Error("Ticket not found"));
      resolve();
    });
  });
};

exports.updateCategory = ({ ticketId, category }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Tickets
      SET category = ?
      WHERE id = ?;
    `;
    db.run(sql, [category, ticketId], function (err) {
      if (err) reject(err);
      if (this.changes === 0) reject(new Error("Ticket not found"));
      resolve();
    });
  });
};
