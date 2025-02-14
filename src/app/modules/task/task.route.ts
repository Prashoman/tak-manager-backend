import express, { NextFunction, Request, Response } from "express";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import auth from "../../middleware/auth";
import { TaskValidation } from "./task.validation";
import { TaskController } from "./task.controller";

const route = express.Router();

route.post(
  "/tasks",
  auth("admin", "user"),
  validationMiddleware(TaskValidation.TaskCreateValidation),
  TaskController.createTask
);

route.get("/tasks", auth("admin", "user"), TaskController.getAllTasks);

route.get("/tasks/:id", auth("admin", "user"), TaskController.getTaskById);

route.put(
  "/tasks/:id",
  auth("admin", "user"),
  validationMiddleware(TaskValidation.TaskUpdateValidation),
  TaskController.updateTask
);

route.delete("/tasks/:id", auth("admin", "user"), TaskController.deleteTask);

export const TaskRoute = route;
