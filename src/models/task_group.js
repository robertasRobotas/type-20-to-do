import mongoose from "mongoose";

const taskGroupSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3 },
  date: { type: String, required: true },
  tasks_ids: { type: Array },
});

export default mongoose.model("TaskGroup", taskGroupSchema);
