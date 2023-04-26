const express = require("express");
const todoController = require("./todo.controller");
const dbSchema = require("./db-schema");
const cors = require("cors");

const app = express();
const port = 3000;

// Create the todos table if it doesn't exist
dbSchema.createSchema();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use("/todos", todoController);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

module.exports = app;
