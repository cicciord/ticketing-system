require("sqlite3");
const { randomBytes, scrypt } = require("crypto");
const users = require("../constants/users.js");

const sqlite = require("sqlite3");

const db = new sqlite.Database("db/TicSys.db", (err) => {
  if (err) throw err;
});

const hash = (password) => {
  const salt = randomBytes(16).toString("hex");
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      const password = derivedKey.toString("hex");
      resolve({ salt, password });
    });
  });
};

const addUser = async (username, password, salt, admin) => {
  try {
    sql =
      "INSERT INTO Users (username, password, salt, admin) VALUES (?, ?, ?, ?)";
    db.run(sql, [username, password, salt, admin]);
  } catch (error) {
    console.error(error);
  }
};

async function main() {
  for (const user of users) {
    const { salt, password } = await hash(user.password);
    await addUser(user.username, password, salt, user.admin);
  }
}

main().catch(console.error);
