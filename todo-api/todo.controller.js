const express = require("express");
const router = express.Router();
const db = require("./db");

// Create a new todo
router.post("/", (req, res) => {
  const { description, dueDate, priority } = req.body;
  if (!description || !dueDate || Number.isNaN(priority)) {
    res
      .status(400)
      .json({ error: "Description, dueDate, and priority are required" });
  } else {
    db.run(
      "INSERT INTO todos (description, dueDate, priority) VALUES (?, ?, ?)",
      [description, dueDate, priority],
      function (err) {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Internal server error" });
        } else {
          const todo = {
            id: this.lastID,
            description,
            dueDate,
            priority,
          };
          res.status(201).json(todo);
        }
      }
    );
  }
});

// Get all todos with pagination and filtering
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  let sql = "SELECT * FROM todos";
  let params = [];
  const description = req.query.description;
  const priority = req.query.priority;
  if (description && priority !== undefined) {
    sql += " WHERE description LIKE ? AND priority = ?";
    params = [`%${description}%`, priority];
  } else if (description) {
    sql += " WHERE description LIKE ?";
    params = [`%${description}%`];
  } else if (priority !== undefined) {
    sql += " WHERE priority = ?";
    params = [priority];
  }
  sql += ` ORDER BY dueDate LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(rows);
    }
  });
});

// Update an existing todo
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { description, dueDate, priority } = req.body;
  if (!description && !dueDate && priority === undefined) {
    res.status(400).json({ error: "At least one field must be updated" });
  } else {
    const updates = [];
    const values = [];
    if (description) {
      updates.push("description = ?");
      values.push(description);
    }
    if (priority !== undefined) {
      updates.push("priority = ?");
      values.push(priority);
    }
    values.push(id);
    const sql = `UPDATE todos SET ${updates.join(", ")} WHERE id = ?`;
    db.run(sql, values, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ message: "Todo updated successfully" });
      }
    });
  }
});

// Delete an existing todo
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
