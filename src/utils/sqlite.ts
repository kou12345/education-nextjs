import sqlite3 from "sqlite3";

const filename = "./src/database/db.sqlite"; // Pathを指定
const db = new sqlite3.Database(filename, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to the SQLite database.");
});

export default db;
