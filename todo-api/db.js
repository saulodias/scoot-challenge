const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './data/todos.db';

let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Connected to the SQLite database at ${DB_PATH}`);
  }
});

module.exports = db;