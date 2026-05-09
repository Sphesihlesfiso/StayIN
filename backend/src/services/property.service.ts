import { Prisma } from "@prisma/client";
import { AppError } from "../errors/errors";
import { handlePrismaError } from "../utils/handlePrismaError";
import prisma from "../config/db";

export const getAllProperties = async () => {
  try {
    return await prisma.property.findMany();
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const getPropertyById = async (id: number) => {
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) throw new AppError("Property not found", 404);
  return property;
};

export const addProperty = async (data: Prisma.PropertyCreateInput) => {
  try {
    return await prisma.property.create({ data });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const deletePropertyById = async (id: number) => {
  try {
    await prisma.property.delete({ where: { id } });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const updateProperty = async (
  id: number,
  data: Prisma.PropertyUpdateInput,
) => {
  try {
    return await prisma.property.update({ where: { id }, data });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
