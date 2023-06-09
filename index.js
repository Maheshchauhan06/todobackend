const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mahesh:mchauhan66@cluster0.kqogx1f.mongodb.net/todoapp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const todoSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Todo = mongoose.model("Todo", todoSchema);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.delete("/api/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Todo.findByIdAndDelete(id);
    console.log(id);
    res.status(200).send("Task deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting task");
  }
});

app.get("/api/get", async (req, res) => {
  try {
    const result = await Todo.find();
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching data");
  }
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const value = req.body.content;
  console.log(value);
  const todo = new Todo({
    title: title,
    content: value,
  });
  todo
    .save()
    .then((result) => {
      console.log(result);
      res.send("Data inserted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error occurred while inserting data");
    });
});

app.get("/", (req, res) => {
  res.send("Server working");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
