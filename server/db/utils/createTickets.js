require("sqlite3");

const tickets = require("../constants/tickets.js");

const sqlite = require("sqlite3");

const db = new sqlite.Database("db/TicSys.db", (err) => {
  if (err) throw err;
});

const addTicket = async (owner_id, state, category, title, timestamp, text) => {
  try {
    sql =
      "INSERT INTO Tickets (owner_id, state, category, title, timestamp, text) VALUES (?, ?, ?, ?, ?, ?)";
    db.run(sql, [owner_id, state, category, title, timestamp, text]);
  } catch (error) {
    console.error(error);
  }
};

async function main() {
  for (const ticket of tickets) {
    await addTicket(
      ticket.owner_id,
      ticket.state === "open" ? 1 : 0,
      ticket.category,
      ticket.title,
      ticket.timestamp,
      ticket.text,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
