import { NextFunction, Request, Response } from "express";
import { ApiError, handleRequestError } from "../controllers/controllers";
import { verifyToken } from "../utils/jwt.utils";

export const isAdmin = (user: any) => {
  return user.userTypeId === 1;
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "unauthorized", "no token provided");
    }

    try {
      req.user = verifyToken(token); // Attach user data to the request object
    } catch (error) {
      throw new ApiError(401, "invalidToken", "Invalid token");
    }

    next();
  } catch (error) {
    handleRequestError(error, req, res);
  }
}

export function authenticateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "unauthorized", "no token provided");
    }

    try {
      req.user = verifyToken(token); // Attach user data to the request object
    } catch (error) {
      throw new ApiError(401, "invalidToken", "Invalid token");
    }

    if (!isAdmin(req.user))
      throw new ApiError(403, "forbidden", "Requires admin");

    next();
  } catch (error) {
    handleRequestError(error, req, res);
  }
}
