import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: {
    required: true,
    type:String,
  },
  isCompleted: {
    required:true,
    type:Boolean
  },
  
});

const Todo = mongoose.model("Todo", TodoSchema);

export { Todo };