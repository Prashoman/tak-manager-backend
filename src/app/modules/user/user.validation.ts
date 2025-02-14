import { z } from "zod";

const UserCreateValidation = z.object({
  body: z.object({
    userName: z.string().nonempty(
      {
        message: "Username cannot be empty",
      }
    ),
    email: z.string().email(
      {
        message: "Invalid email format",
      }
    ),
    password: z.string().nonempty(
      {
        message: "Password cannot be empty",
      }
    ),
  }),
});

const UserUpdateValidation = z.object({
  body: z.object({
    userName: z.string().nonempty(
      {
        message: "Username cannot be empty",
      }
    ),
    email: z.string().email().nonempty(
      {
        message: "Invalid email format",
      }
    ),
    profileImage: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const UserLoginValidation = z.object({
  body: z.object({
    email: z.string().email(
      {
        message: "Invalid email format",
      }
    ),
    password: z.string().nonempty(
      {
        message: "Password cannot be empty",
      }
    ),
  }),
});

const UserForgetPasswordValidation = z.object({
  body: z.object({
    email: z.string().email(
      {
        message: "Invalid email format",
      }
    ),
  }),
});

const UserResetPasswordValidation = z.object({
  body: z.object({
    id: z.string().nonempty(
      {
        message: "Invalid user id",
      }
    ),
    newPassword: z.string().nonempty(
      {
        message: "New password cannot be empty",
      }
    ),
  }),
});

const UserChangePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string().nonempty(
      {
        message: "Old password cannot be empty",
      }
    ),
    newPassword: z.string().nonempty(
      {
        message: "New password cannot be empty",
      }
    ),
  }),
});

export const UserValidation = {
  UserCreateValidation,
  UserUpdateValidation,
  UserLoginValidation,
  UserForgetPasswordValidation,
  UserResetPasswordValidation,
  UserChangePasswordValidation
};
