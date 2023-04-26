const db = require('./db');

function createSchema() {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    dueDate INTEGER NOT NULL,
    priority INTEGER NOT NULL
  )`, (err) => {
    if (err) {
      console.error("error creating database schema:", err);
    } else {
      console.log("database schema created successfully");
    }
  });
}

module.exports = {
  createSchema
};
