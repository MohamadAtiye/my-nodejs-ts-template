import { Request } from "express";
import { TokenPayload } from "../utils/jwt.utils";

declare module "express" {
  export interface Request {
    user?: TokenPayload; // Your custom user object type
  }
}
