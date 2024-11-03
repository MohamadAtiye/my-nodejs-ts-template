import { Response, Request } from "express";
import { ValidationError } from "yup";

///////////////////////////////////////////////// -- response codes
type AuthErrors =
  | "user_not_found"
  | "wrong_password"
  | "user_disabled"
  | "no_org_user"
  | "unauthorized" // 401
  | "invalidToken" // 401
  | "forbidden"; // 403

type RequestErrors =
  | "missing_data"
  | "not_found"
  | "duplicate_data"
  | "validationError"
  | "internalServerError"; // 500

export type ErrorCodes = AuthErrors | RequestErrors;

export class ApiError extends Error {
  status: number;
  code: ErrorCodes;
  details?: any;
  constructor(
    status: number,
    code: ErrorCodes,
    message?: string,
    details?: any
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function formatErrorResponse(
  status: number,
  code: ErrorCodes,
  message?: string,
  details?: any
) {
  return {
    status,
    error: {
      code,
      message,
      details,
    },
  };
}

export const handleRequestError = (
  err: unknown,
  req: Request,
  res: Response
) => {
  let status = 500;
  let code: ErrorCodes = "internalServerError";
  let message = "Something went wrong";
  let details: unknown = undefined;

  if (err instanceof ApiError) {
    status = err.status;
    code = err.code;
    message = err.message;
    details = err.details;
  } else if (err instanceof ValidationError) {
    status = 400;
    code = "validationError";
    message = "Error validating request data";
    details = err.inner.map((error) => ({
      field: error.path,
      message: error.message,
    }));
  } else if (err instanceof Error) {
    console.log("Unknown Error", err);
    message = err.message;
  }

  // TODO: handle error logging
  console.error("Error at ", req.originalUrl);
  console.error("status:", status, ", code:", code, ", message:", message);

  res.status(status).json(formatErrorResponse(status, code, message, details));
  // {
  //   status,
  //   error: {
  //     code,
  //     message,
  //     details
  //   }
  // };
};

//////////////////////////////////////////////////////////////////////////////

// success
export const respond_200 = (res: Response, data: any) => {
  res.status(200).json(data);
};
