// services/amenity.service.ts
import {
  CreateAmenityInput,
  UpdateAmenityInput,
} from "../../schema/amenity.schema";
import prisma from "../config/db";
import { handlePrismaError } from "../utils/handlePrismaError";
import { AppError } from "../errors/errors";

export const getAllAmenities = async () => {
  try {
    return await prisma.amenity.findMany({
      select: {
        id: true,
        name: true,
        propertyId: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const getAmenityById = async (id: number) => {
  const amenity = await prisma.amenity.findUnique({ where: { id } });
  if (!amenity) throw new AppError("Amenity not found", 404);
  return amenity;
};

export const addAmenity = async (data: CreateAmenityInput) => {
  try {
    return await prisma.amenity.create({
      data: {
        name: data.name,
        Property: { connect: { id: data.propertyId } },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const deleteAmenity = async (id: number) => {
  try {
    await prisma.amenity.delete({ where: { id } });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const updateAmenity = async (id: number, data: UpdateAmenityInput) => {
  try {
    return await prisma.amenity.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
