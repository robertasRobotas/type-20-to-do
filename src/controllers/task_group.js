import TaskGroupModel from "../models/task_group.js";

const CREATE_TASK_GROUP = async (req, res) => {
  try {
    const group = new TaskGroupModel({
      title: req.body.title,
      date: req.body.date,
      tasks_ids: req.body.tasks_ids,
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

const GET_ALL_TASK_GROUPS = async (req, res) => {
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
    ]).exec();

    return res.json({ tasks: tasks });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

export { CREATE_TASK_GROUP, GET_ALL_TASK_GROUPS };
