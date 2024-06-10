const sqlite = require("sqlite3");

const additionalTexts = require("../constants/additionalContents");

const db = new sqlite.Database("db/tickets.db", (err) => {
  if (err) throw err;
});

const addAdditionalText = async (ticket_id, author_id, timestamp, text) => {
  return new Promise((resolve, reject) => {
    sql =
      "INSERT INTO AdditionalContents (ticket_id, author_id, timestamp, text) VALUES (?, ?, ?, ?)";
    db.run(sql, [ticket_id, author_id, timestamp, text], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

async function main() {
  for (const additionalText of additionalTexts) {
    await addAdditionalText(
      additionalText.ticket_id,
      additionalText.author_id,
      additionalText.timestamp,
      additionalText.text,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
