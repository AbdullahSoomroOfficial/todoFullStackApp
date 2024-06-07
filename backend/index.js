// import express, { response } from "express";
// import { Todo } from "./modals/TodoModal.js";
// import { connectDatabase } from "./db/connectdb.js";

// const app = express();

// await connectDatabase();

// app.use(express.urlencoded({ extended: false }));

// app.get("/todos", (req, res) => {
//   res.send("heloo");
// });

// app.post("/todos", async(req, res) => {
//  const task = req.body;
//  const todo = new Todo(task);
//  await todo.save();
//  res.send({
//   msg:"Todo created"
//  });
// });

// app.delete("/todos", (req, res) => {
//   res.send("heloo");
// });

// app.put("/todos", (req, res) => {
//   res.send("heloo");
// });

// // GET -> /users
// // GET -> /users/:id
// // POST -> users
// // DELETE -> users
// // PUT -> users

// app.listen(3000, () => {
//   console.log("server is listning 3000");
// });

import express from "express";
import { Todo } from "./modals/TodoModal.js";
import { connectDatabase } from "./db/connectdb.js";
import cors from "cors"
const app = express();

await connectDatabase();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add this line to parse JSON request bodies

// Todo Endpoints

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
