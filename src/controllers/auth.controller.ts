// controllers/auth.controller.ts
import { Request, Response } from "express";
import * as userServices from "../services/user.service";
import * as authModels from "../models/auth.model";
import { comparePassword, encrypt } from "../utils/utils";
import { ApiError, handleRequestError, respond_200 } from "./controllers";
import {
  generateRefreshToken,
  generateToken,
  verifyToken,
} from "../utils/jwt.utils";

export const post_loginUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as authModels.post_login_args;

    // check username exist
    const foundUser = await userServices.findUserByUsername(body.username);
    if (!foundUser)
      throw new ApiError(
        400,
        "user_not_found",
        "Username is not associated with any account"
      );

    // verify password
    const isMatch = await comparePassword(body.password, foundUser.password);
    if (!isMatch)
      throw new ApiError(400, "wrong_password", "Wrong password entered");

    // check user not disabled
    if (foundUser.isDeleted)
      throw new ApiError(
        400,
        "user_disabled",
        "This account is disabled. Please contact your administrator."
      );

    // format user profile
    const profile: authModels.UserProfile = {
      id: foundUser.id,
      username: foundUser.username,
      isPhone: foundUser.isPhone,
      fName: foundUser.fName,
      lName: foundUser.lName,
      profilePicUrl: foundUser.profilePicUrl,
      passwordExpireDate: foundUser.passwordExpireDate,
      shouldChangePassword: foundUser.shouldChangePassword,
    };

    // generate tokens
    const auth = {
      accessToken: generateToken({
        id: profile.id,
        username: profile.username,
        userTypeId: foundUser.userTypeId,
      }),
      refreshToken: generateRefreshToken({
        id: profile.id,
        username: profile.username,
        userTypeId: foundUser.userTypeId,
      }),
    };

    // return response
    const response: authModels.post_login_response = { profile, auth };
    respond_200(res, response);
  } catch (error) {
    handleRequestError(error, req, res);
  }
};

export const post_refreshUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as authModels.post_refresh_args;

    // read and check refresh token data
    let userId = "";
    try {
      const tokenUser = verifyToken(body.refreshToken);
      if (tokenUser.username !== body.username)
        throw new ApiError(403, "invalidToken");

      userId = tokenUser.id;
    } catch (tokenError) {
      throw new ApiError(403, "invalidToken");
    }

    // get user data
    const foundUser = await userServices.findUser(userId);
    if (!foundUser) throw new ApiError(400, "user_not_found", "User not found");

    // check user not disabled
    if (foundUser.isDeleted)
      throw new ApiError(
        400,
        "user_disabled",
        "This account is disabled. Please contact your administrator."
      );

    // format user profile
    const profile: authModels.UserProfile = {
      id: foundUser.id,
      username: foundUser.username,
      isPhone: foundUser.isPhone,
      fName: foundUser.fName,
      lName: foundUser.lName,
      profilePicUrl: foundUser.profilePicUrl,
      passwordExpireDate: foundUser.passwordExpireDate,
      shouldChangePassword: foundUser.shouldChangePassword,
    };

    // generate tokens
    const auth = {
      accessToken: generateToken({
        id: profile.id,
        username: profile.username,
        userTypeId: foundUser.userTypeId,
      }),
      refreshToken: generateRefreshToken({
        id: profile.id,
        username: profile.username,
        userTypeId: foundUser.userTypeId,
      }),
    };

    // return response
    const response: authModels.post_refresh_response = { profile, auth };
    respond_200(res, response);
  } catch (error) {
    handleRequestError(error, req, res);
  }
};

export const post_changePassword = async (req: Request, res: Response) => {
  try {
    const body = req.body as authModels.post_changePassword_args;

    // get user data
    const foundUser = await userServices.findUser(req.user?.id!);
    if (!foundUser) throw new ApiError(400, "user_not_found", "User not found");

    // check user not disabled
    if (foundUser.isDeleted)
      throw new ApiError(
        400,
        "user_disabled",
        "This account is disabled. Please contact your administrator."
      );

    // check password
    const isMatch = await comparePassword(
      body.currentPassword,
      foundUser.password
    );
    if (!isMatch)
      throw new ApiError(400, "wrong_password", "Wrong password entered");

    // update password
    const newEncryptedPassword = await encrypt(body.newPassword);
    await userServices.updateUserPassword(foundUser.id, newEncryptedPassword);

    // return response
    respond_200(res, {});
  } catch (error) {
    handleRequestError(error, req, res);
  }
};
