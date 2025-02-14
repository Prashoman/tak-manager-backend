import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import { UserService } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const userSignUp = catchAsyn(async (req: Request, res: Response) => {
  const userInfo = req.body;
  const insertedUser = await UserService.signUpIntoDB(userInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: insertedUser,
    message: "User created successfully",
  });
});

const userLogin = catchAsyn(async (req: Request, res: Response) => {
  const userCredentials = req.body;
  const { userWithOutPassword, accessToken, refreshToken } =
    await UserService.useLoginFromDB(userCredentials);
  if (accessToken && refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    token: accessToken,
    data: userWithOutPassword,
    message: "User logged in successfully",
  });
});

const changePassword = catchAsyn(async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;
  // console.log({ user });

  const updatedUser = await UserService.changePasswordIntoDB(
    user,
    oldPassword,
    newPassword
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: updatedUser,
    message: "Password changed successfully",
  });
});

const updateProfile = catchAsyn(async (req: Request, res: Response) => {
  const userInfo = req.body;
  const user = req.user;
  const updatedUser = await UserService.updateProfileIntoDB(user, userInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: updatedUser,
    message: "Profile updated successfully",
  });
});

const getProfile = catchAsyn(async (req: Request, res: Response) => {
  const user = req.user;
  const myProfile = await UserService.getProfileFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: myProfile,
    message: "Profile fetched successfully",
  });
});

const forgetPassword = catchAsyn(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await UserService.forgetPasswordIntoDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Password reset link sent to your email",
  });
});

const resetPassword = catchAsyn(async (req: Request, res: Response) => {
  const { id, newPassword } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const result = await UserService.resetPasswordIntoDB(id, token!, newPassword);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Password reset successfully",
  });
});

export const UserController = {
  userSignUp,
  userLogin,
  changePassword,
  updateProfile,
  getProfile,
  forgetPassword,
  resetPassword,
};
