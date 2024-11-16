import { NextFunction, Request, Response } from "express";
import { ApiError, handleRequestError } from "../controllers/controllers";
import { TokenPayload, verifyToken } from "../utils/jwt.utils";

export const isAdmin = (user: TokenPayload) => {
  return user.isGlobalAdmin;
};

export const isOrgAdmin = (user: TokenPayload, orgId: number) => {
  return user.orgs.some((org) => org.id === orgId && org.roleId === 1);
};

export const isOrgMember = (user: TokenPayload, orgId: number) => {
  return user.orgs.some((org) => org.id === orgId);
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "unauthorized", "no token provided");
    }

    try {
      // read token contents
      const user = verifyToken(token);
      // check contents of token
      if (!user.id || !user.username || !user.orgs.length)
        throw new ApiError(401, "invalidToken", "Invalid token");
      // attach user data to the request object
      req.user = user;
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
      // read token contents
      const user = verifyToken(token);
      // check contents of token
      if (!user.id || !user.username || !user.orgs.length)
        throw new ApiError(401, "invalidToken", "Invalid token");
      // attach user data to the request object
      req.user = user;
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
