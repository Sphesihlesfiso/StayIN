import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export const getAllProperties = async () => {
  const properties = await prisma.property.findMany();
  return properties;
};

export const getPropertyById = async (id: number) => {
  const property = await prisma.property.findUnique({ where: { id } });
  return property;
};
export const addProperty = async (data: Prisma.PropertyCreateInput) => {
  const newProperty = await prisma.property.create({ data });
  return newProperty;
};
export const deletePropertyById = async (id: number) => {
  await prisma.property.delete({ where: { id } });
};
export const updateProperty = async (
  data: Prisma.PropertyUpdateInput,
  id: number,
) => {
  return await prisma.property.update({ where: { id }, data });
};
