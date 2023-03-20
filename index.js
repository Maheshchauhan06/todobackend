const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "mchauhan66@gmail",
  database: "todoapp",
});

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqldelete = "DELETE FROM todoapp WHERE id = ?";
  db.query(sqldelete, id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting task");
    } else {
      console.log(result);
      res.status(200).send("Task deleted successfully");
    }
  });
});

app.get("/api/get", (req, res) => {
  const sqlselect = "SELECT * FROM todoapp";
  db.query(sqlselect, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const value = req.body.content;
  console.log(value);
  const sqlInsert = "INSERT INTO todoapp (title, input) VALUES (?,?)";
  db.query(sqlInsert, [title, value], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while inserting data");
    } else {
      console.log(result);
      res.send("Data inserted successfully");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Server working");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
