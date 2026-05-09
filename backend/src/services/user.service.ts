import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../utils/handlePrismaError";
export const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
};
export const updateUser = async (id: number,data: Prisma.UserUpdateInput, ) => {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (error) {
    handlePrismaError(error);
  }
};
