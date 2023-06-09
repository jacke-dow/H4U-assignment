const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.post("/api/formData", (req, res) => {
  const formData = req.body;

  const query = "INSERT INTO form_data SET ?";
  connection.query(query, formData, (err, result) => {
    if (err) {
      console.error("Failed to insert form data:", err);
      res.status(500).json({ error: "Failed to save form data" });
      return;
    }

    res.json({ message: "Form data saved successfully" });
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
