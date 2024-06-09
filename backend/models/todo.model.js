import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    required: true,
    type: String,
  },
  isCompleted: {
    required: true,
    type: Boolean,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
