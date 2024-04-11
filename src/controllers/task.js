import { v4 as uuidv4 } from "uuid";
import TaskModel from "../models/task.js";
import TaskGroupModel from "../models/task_group.js";

const CREATE_TASK = async (req, res) => {
  try {
    const task = new TaskModel({
      id: uuidv4(),
      title: req.body.title,
      status: req.body.status,
    });

    const response = await task.save();

    await TaskGroupModel.findByIdAndUpdate(req.params.groupId, {
      $push: { tasks_ids: task.id },
    });

    return res
      .status(201)
      .json({ status: "Task was created", response: response });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const GET_ALL_TASKS = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    return res.json({ tasks: tasks });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const GET_PAGINATED_TASKS = async (req, res) => {
  const pageSize = 3;
  const page = Number(req.params.page);

  try {
    const tasks = await TaskModel.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return res.json({ tasks: tasks });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const GET_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "task not exist" });
    }

    return res.status(200).json({ task: task });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const UPDATE_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "task not exist" });
    }

    return res.status(200).json({ message: "updated", task: task });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const DELETE_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "task not exist" });
    }

    return res.status(200).json({ message: "DELETED", task: task });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

export {
  CREATE_TASK,
  GET_ALL_TASKS,
  GET_PAGINATED_TASKS,
  GET_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
  DELETE_TASK_BY_ID,
};
