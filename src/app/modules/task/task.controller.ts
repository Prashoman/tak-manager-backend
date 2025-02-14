import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";

import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { TaskService } from "./task.service";

const createTask = catchAsyn(async (req: Request, res: Response) => {
  const taskInfo = req.body;
  const user = req.user;
  const task = await TaskService.taskCreateInfoDB(taskInfo, user?.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: task,
    message: "Task created successfully",
  });
});

const getAllTasks = catchAsyn(async (req: Request, res: Response) => {
   const query = req.query;
  const tasks = await TaskService.getAllTasksFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: tasks,
    message: "All tasks retrieved successfully",
  });
});

const getTaskById = catchAsyn(async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const task = await TaskService.getTaskByIdFromDB(taskId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: task,
    message: "Task retrieved successfully",
  });
});

const updateTask = catchAsyn(async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const taskInfo = req.body;
  const user = req.user;
  const task = await TaskService.updateTaskFromDB(taskId, taskInfo, user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: task,
    message: "Task updated successfully",
  });
});

const deleteTask = catchAsyn(async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const result = await TaskService.deleteTaskFromDB(taskId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Task deleted successfully",
  });
});


export const TaskController = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask

};
