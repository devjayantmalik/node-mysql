// Import Express to create a server
// Import Mysql to create a database connection
const express = require("express");
const mysql = require("mysql");

// Create a server
const server = express();

// Create a database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "password",
  database: "node_mysql",
});

// Connect to the mysql server
connection.connect((err) => {
  if (err) throw err;

  console.log("Database connected...");
});

// Create a database
connection.query(
  "CREATE DATABASE IF NOT EXISTS node_mysql;",
  (err, results) => {
    if (err) throw err;

    console.log("Database created...");
  }
);

// Create a posts table.
const query = `
CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL UNIQUE,
    author_name VARCHAR(100) NOT NULL DEFAULT 'anonymous',
    content TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

connection.query(query, (err, result) => {
  if (err) throw err;

  console.log("Table created successfully.");
});

// Get data from the server
connection.query("SELECT * FROM posts", (err, result) => {
  if (err) throw err;

  console.log(result);
});

// Insert data in the server
const post = {
  title: "Post 2",
  author_name: "Author 2",
  content: "This is post content",
};

connection.query("INSERT INTO posts SET ?;", post, (err, result) => {
  if (err) throw err;

  console.log(result);
});

// Update into Posts
const post2 = {
  content: "This is updated post content",
};

connection.query("UPDATE posts SET ? WHERE id=2;", post2, (err, result) => {
  if (err) throw err;

  console.log(result);
});

// Delete posts
connection.query("DELETE FROM posts WHERE id=1;", (err, result) => {
  if (err) throw err;

  console.log(result);
});

// Start the server
const port = 5000;
server.listen(port, () => {
  console.log("Server started at: http://localhost:5000");
});
