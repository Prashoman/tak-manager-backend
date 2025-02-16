import { ObjectId } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TTask } from "./task.interface";
import { Task } from "./task.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const taskCreateInfoDB = async (taskInfo: TTask, userId: string) => {
  taskInfo.user = userId as any;
  const result = await Task.create(taskInfo);
  return result;
};

const getAllTasksFromDB = async (query: any) => {
  const tasks = new QueryBuilder(
    Task.find().populate("user", "name email _id"),
    query
  )
    .search(["title"])
    .filter()
    .sort()
    .paginate();
  const meta = await tasks.countTotal();
  const result = await tasks.modelQuery;
  return { meta, result };
};

const getTaskByIdFromDB = async (taskId: string) => {
  const task = await Task.findById(taskId).populate("user", "name email _id");
  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }
  return task;
};

const updateTaskFromDB = async (
  taskId: string,
  taskInfo: Partial<TTask>,
  user: string
) => {
  taskInfo.user = user as any;
  const task = await Task.findByIdAndUpdate(taskId, taskInfo, { new: true });
  return task;
};

const deleteTaskFromDB = async (taskId: string) => {
  const result = await Task.findByIdAndDelete(taskId);
  return result;
};

export const TaskService = {
  taskCreateInfoDB,
  getAllTasksFromDB,
  getTaskByIdFromDB,
  updateTaskFromDB,
  deleteTaskFromDB,
};
