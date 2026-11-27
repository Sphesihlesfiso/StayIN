import { AppError } from "../errors/errors";
import { Prisma } from "@prisma/client";
/**
 *Handles Prisma error
 *@param error -The prisma error 
 *@throws Console logs a db error and throws it along its prisma code.
 */

export const handlePrismaError = (error: unknown):never => {
   console.error("Prisma Error:", error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new Error(`Database request error (${error.code}): ${error.message}`);
    }
    throw new Error("Database error");
  };
