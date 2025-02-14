import { model, Schema } from "mongoose";
import { TTask } from "./task.interface";

const taskSchema = new Schema<TTask>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<TTask>("Task", taskSchema);
