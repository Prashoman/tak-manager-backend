import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";

const route = express.Router();
route.post(
  "/register",
  validationMiddleware(UserValidation.UserCreateValidation),
  UserController.userSignUp
);

route.post(
  "/login",
  validationMiddleware(UserValidation.UserLoginValidation),
  UserController.userLogin
);

route.get("/profile", auth("admin", "user"), UserController.getProfile);

route.put(
  "/profile",
  auth("admin", "user"),
  validationMiddleware(UserValidation.UserUpdateValidation),
  UserController.updateProfile
);

route.post(
  "/change-password",
  auth("admin", "user"),
  validationMiddleware(UserValidation.UserChangePasswordValidation),
  UserController.changePassword
);

route.post("/forgot-password", validationMiddleware(UserValidation.UserForgetPasswordValidation), UserController.forgetPassword);

route.post("/reset-password", validationMiddleware(UserValidation.UserResetPasswordValidation), UserController.resetPassword);

export const UserRoute = route;
