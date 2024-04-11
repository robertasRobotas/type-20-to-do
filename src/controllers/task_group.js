import mongoose from "mongoose";
import TaskGroupModel from "../models/task_group.js";

const CREATE_TASK_GROUP = async (req, res) => {
  try {
    const group = new TaskGroupModel({
      //id: uuid()
      title: req.body.title,
      date: req.body.date,
      tasks_ids: [],
    });

    const response = await group.save();

    return res
      .status(201)
      .json({ status: "Task Group was created", response: response });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const GET_ALL_GROUPS = async (req, res) => {
  try {
    const groups = await TaskGroupModel.find();

    return res.json({ groups: groups });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const GET_TASK_GROUP_BY_ID = async (req, res) => {
  try {
    const tasks = await TaskGroupModel.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "tasks_ids",
          foreignField: "id",
          as: "tasks",
        },
      },
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ]).exec();

    return res.json({ tasks: tasks });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const DELETE_GROUP_BY_ID = async (req, res) => {
  try {
    const tasks = await TaskGroupModel.findOneByIdAndDelete(req.params.id);
    // const tasks = await TaskGroupModel.findOneByIdAndDelete({id: req.params.id});

    return res.json({ tasks: tasks });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

export {
  CREATE_TASK_GROUP,
  GET_TASK_GROUP_BY_ID,
  GET_ALL_GROUPS,
  DELETE_GROUP_BY_ID,
};
