import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("Database connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error: " + err);
});

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/todoapp");
  } catch (error) {
    console.log(error);
  }
};

export { connectDatabase };
