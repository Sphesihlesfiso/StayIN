import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../utils/handlePrismaError";
import { CreateUserInput } from "../../schema/auth.schema";
import { UpdateUserInput } from "../../schema/user.schema";
export const getUser = async (id: number) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
};
export const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
};
export const updateUser = async (id: number, data: UpdateUserInput) => {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (error) {
    handlePrismaError(error);
  }
};
