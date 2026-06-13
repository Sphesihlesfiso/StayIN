import {
  CreateNearByPlaceInput,
  UpdateNearByPlaceInput,
} from "../../schema/nearbyPlace.schema";
import prisma from "../config/db";
import { handlePrismaError } from "../utils/handlePrismaError";
import { AppError } from "../errors/errors";

export const getAllNearbyPlaces = async (propertyId: number) => {
  try {
    return await prisma.nearbyPlace.findMany({
      where: { nearByPlaceId: propertyId },
    });
  } catch (error) {
    handlePrismaError(error);
  }
};

export const getNearbyPlaceById = async (id: number) => {
  const nearbyPlace = await prisma.nearbyPlace.findUnique({ where: { id } });
  if (!nearbyPlace) throw new AppError("Nearby place not found", 404);
  return nearbyPlace;
};

export const addNearbyPlace = async (data: CreateNearByPlaceInput) => {
  try {
    return await prisma.nearbyPlace.create({
      data: {
        name: data.name,
        type: data.type,
        distance: data.distance,
        Property: { connect: { id: data.nearByPlaceId } },
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
};

export const deleteNearbyPlace = async (id: number) => {
  try {
    await prisma.nearbyPlace.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
};

export const updateNearbyPlace = async (
  id: number,
  data: UpdateNearByPlaceInput,
) => {
  try {
    return await prisma.nearbyPlace.update({
      where: { id },
      data,
    });
  } catch (error) {
    handlePrismaError(error);
  }
};
