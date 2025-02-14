import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    userName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    profileImage: { type: String, required: false, default: "https://i.ibb.co.com/fz3HyvJq/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector.jpg" },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    bio: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salts_rounds));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
