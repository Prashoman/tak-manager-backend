import { z } from "zod";
import { dateFormat } from "./task.constant";

const TaskCreateValidation = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: "Title cannot be empty",
    }),
    description: z.string().nonempty({
      message: "Description cannot be empty",
    }),
    dueDate: z.string().refine((val) => dateFormat.test(val), {
      message: "Invalid date format, expected YYYY-MM-DD. Example:2024-06-15",
    }),
  }),
});

const TaskUpdateValidation = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: "Title cannot be empty",
    }),
    description: z.string().nonempty({
      message: "Description cannot be empty",
    }),
    dueDate: z.string().refine((val) => dateFormat.test(val), {
      message: "Invalid date format, expected YYYY-MM-DD. Example:2024-06-15",
    }),
    status: z.string().nonempty({
      message: "Status cannot be empty",
    }),
  }),
});

export const TaskValidation = {
  TaskCreateValidation,
  TaskUpdateValidation,
};
