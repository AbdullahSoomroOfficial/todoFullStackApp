import express from "express";
import { Todo } from "./models/todo.model.js";
import { connectDatabase } from "./database/connectDatabase.js";
import cors from "cors";
const app = express();

await connectDatabase();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

/**
 * Todo Endpoints
 */
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.json(todo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const task = req.body;
    const todo = new Todo(task);
    await todo.save();
    res.send({ msg: "Todo created" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.send({ msg: "Todo deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    const todo = await Todo.findByIdAndUpdate(id, updatedTask, { new: true });
    res.json(todo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
