import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRouter from "./src/routes/task.js";
import taskGroupRouter from "./src/routes/task_group.js";
import userRouter from "./src/routes/user.js";
import "dotenv/config";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log("err: ", err);
  });

app.use(userRouter);
app.use(taskGroupRouter);
app.use(taskRouter);

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP STARTED ON PORT ${process.env.PORT}`);
});
