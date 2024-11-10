import * as yup from "yup";
import { createYupSchema } from "./middleware";
import * as authModels from "../models/auth.model";

const newPasswordRules = yup
  .string()
  .required("Password is required.")
  .min(8, "Password must be at least 8 characters long.")
  .max(30, "Password must be at most 30 characters long.")
  .matches(
    /^(?=.*[A-Z])/,
    "Password must contain at least one uppercase letter."
  )
  .matches(/^(?=.*\d)/, "Password must contain at least one number.")
  .matches(
    /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
    "Password must contain at least one symbol."
  )
  .matches(
    /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/,
    "Password can contain only Latin letters, numbers, and symbols."
  )
  .matches(
    /^(?!.*(.)\1{2})/,
    "Password cannot contain three repeating characters."
  );

export const post_login = createYupSchema<authModels.post_login_args>(
  yup.object({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
  })
);

export const post_refresh = createYupSchema<authModels.post_refresh_args>(
  yup.object({
    username: yup.string().required("Username is required."),
    refreshToken: yup.string().required("Refresh token is required."),
  })
);

export const put_changePassword =
  createYupSchema<authModels.put_changePassword_args>(
    yup.object({
      currentPassword: yup.string().required("Current Password is required."),

      newPassword: newPasswordRules.notOneOf(
        [yup.ref("currentPassword")],
        "New Password cannot be the same as the Current Password."
      ),

      confirmNewPassword: yup
        .string()
        .required("Confirm New Password is required.")
        .oneOf([yup.ref("newPassword")], "Passwords do not match"),
    })
  );
