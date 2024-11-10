// src/middleware/validator.ts
import { ObjectSchema } from "yup";
import * as yup from "yup";

import { Request, Response, NextFunction } from "express";
import { handleRequestError } from "../controllers/controllers";

export function validateIncoming<T extends object>(
  schema: ObjectSchema<T>
): (req: Request, res: Response, next: NextFunction) => void {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      handleRequestError(error, req, res);
    }
  };
}

// Helper function to enforce type compatibility
export function createYupSchema<T extends Record<string, unknown>>(
  schema: yup.ObjectSchema<T>
): yup.ObjectSchema<T> {
  return schema;
}
