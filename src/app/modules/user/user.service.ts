import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import createToken from "../../../utils/createToken";
import { sendEmail } from "./user.constant";

const signUpIntoDB = async (payload: TUser) => {
  const existEmail = await User.findOne({ email: payload.email });
  if (existEmail) {
    throw new AppError(httpStatus.FORBIDDEN, "Email already exist");
  }
  const result = await User.create(payload);
  return result;
};





const useLoginFromDB = async (payload: TUserLogin) => {
  const { email, password } = payload;
  const user = await User.findOne({ email}).select(
    "+password"
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Email Not Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  // console.log({ isMatch });

  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password dose not match");
  }

  const jwtPayload = { id: user._id, userRole: user.role as "admin" | "user" };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_token_secret as string,
    config.jwt_token_expiry as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expiry as string
  );

  const userWithOutPassword = await User.findById(user._id);
  return {
    userWithOutPassword,
    accessToken,
    refreshToken,
  };
};



const changePasswordIntoDB = async (
  user: any,
  oldPassword: string,
  newPassword: string
) => {
  const userWithPassword = await User.findOne({
    _id: user.id,
  }).select("+password");
  if (!userWithPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isMatch = await bcrypt.compare(oldPassword, userWithPassword.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password dose not match");
  }
  const newPasswordHash = await bcrypt.hash(
    newPassword,
    Number(config.salts_rounds)
  );
  const updatePassword = await User.findByIdAndUpdate(user.id, {
    password: newPasswordHash,
  });
  return updatePassword;
};

const updateProfileIntoDB = async (user: any, userInfo: TUser) => {
  const matchUser = await User.findOne({ _id: user.id });
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const updatedUser = await User.findByIdAndUpdate({ _id: user.id }, userInfo, {
    new: true,
  });
  return updatedUser;
};

const getProfileFromDB = async (user: any) => {
  const matchUser = await User.findById({ _id: user.id });
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return matchUser;
};

const forgetPasswordIntoDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const jwtPayload = { id: user._id, userRole: user.role as "admin" | "user" };
  const token = createToken(
    jwtPayload,
    config.jwt_token_secret as string,
    "10m"
  );

  console.log({ token });
  console.log("user id:", user._id);
  
  
  const link = `${config.fronted_url}/reset-password?id=${user?._id}&token=${token}`;
  sendEmail(
    email,
    " Change Your Password with !0 Minutes ",
    "<b>Click the link to change password</b>" + link
  );
  return link;
};

const resetPasswordIntoDB = async (
  id: string,
  token: string,
  newPassword: string
) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const jwtPayload: any = jwt.verify(token, config.jwt_token_secret as string);
  if (jwtPayload.id != user._id) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authorized");
  }

  const newPasswordHash = await bcrypt.hash(
    newPassword,
    Number(config.salts_rounds)
  );
  const updatePassword = await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    {
      password: newPasswordHash,
    }
  );
  return updatePassword;
};

export const UserService = {
  signUpIntoDB,
  useLoginFromDB,
  changePasswordIntoDB,
  updateProfileIntoDB,
  getProfileFromDB,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
};
// http://localhost:3000/reset-password?id=67926cf7dfd7c8f43b1d9d54&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTI2Y2Y3ZGZkN2M4ZjQzYjFkOWQ1NCIsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTczNzY5ODAzMywiZXhwIjoxNzM3Njk4MzMzfQ.jDUicc8ek6p1i0RAGcZkL6Ps1NdLTeDXP3-j3hVnIPc"
