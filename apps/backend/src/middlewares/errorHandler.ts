import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { z } from "zod";
import { AppError } from "../common/utils/AppError";

const formatZodError = (res: Response, err: z.ZodError) => {
  const errors = err?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: err,
  });
};
export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error(`Error occured on PATH: ${req.path}`, err);

  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format, please check your request body",
    });
  }

  if (err instanceof z.ZodError) {
    return formatZodError(res, err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err?.message || "Unknown error occured",
  });
};
