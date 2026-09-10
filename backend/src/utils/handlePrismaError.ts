import { AppError } from "../errors/errors";
import { Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/binary';

export const handlePrismaError = (error: unknown) => {
  if (error instanceof PrismaClientUnknownRequestError)  {
    switch (error.message) {
      case "P2025":
        throw new AppError("Record not found", 404);
      case "P2002":
        throw new AppError("Duplicate entry", 409);
    
      case "P2003":
        throw new AppError("Related record not found", 400);

      default:
        throw new AppError("Database error", 500);
    }
  }
  if (error instanceof PrismaClientValidationError) {
    throw new AppError(
      "Invalid data provided", 400);
  }
  
  throw new AppError("Internal server error", 500);
};
