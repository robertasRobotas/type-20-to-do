import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true, min: 3 },
  status: { type: Boolean, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);
