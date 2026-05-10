// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errors";
import { errorResponse } from "../utils/apiResponce";
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorResponse(error.message));
  }

  // unexpected error
  return res.status(500).json(errorResponse("Internal server error"));
};
