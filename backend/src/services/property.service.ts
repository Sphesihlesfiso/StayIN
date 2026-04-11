import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import { AppError } from "../errors/errors";
export const getAllProperties = async () => {
  try {
    const properties = await prisma.property.findMany();
    return properties;
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to get all properties", 404);
  }
};

export const getPropertyById = async (id: number) => {
  try {
    const property = await prisma.property.findUnique({ where: { id } });
    return property;
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to get  property by id", 404);
  }
};
export const addProperty = async (data: Prisma.PropertyCreateInput) => {
  try {
    const newProperty = await prisma.property.create({ data });
    return newProperty;
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to add property", 400);
  }
};
export const deletePropertyById = async (id: number) => {
  try {
    await prisma.property.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to delete property with id " + id, 500);
  }
};
export const updateProperty = async (
  data: Prisma.PropertyUpdateInput,
  id: number,
) => {
  try {
    return await prisma.property.update({ where: { id }, data });
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to update property with id " + id, 500);
  }
};
