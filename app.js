const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Set up the MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testdb",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Vulnerable endpoint with SQL injection
app.get("/users", (req, res) => {
  const userId = req.query.id;

  // WARNING: The query below is vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE id = ${userId};`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Database query failed");
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
