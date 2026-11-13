import { AppError } from "../errors/errors";
import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: unknown):never => {
   console.error("Prisma Error:", error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new Error(`Database request error (${error.code}): ${error.message}`);
    }
    throw new Error("Database error");
  };
  // elif (error instanceof Prisma.PrismaClientValidationError) {
  
  //   throw new  Error("Invalid data provided", 400);
  // }
  // throw new AppError("Internal server error", 500);

