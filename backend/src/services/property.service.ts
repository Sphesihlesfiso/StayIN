import { Prisma } from "@prisma/client";
import { AppError } from "../errors/errors";
import { handlePrismaError } from "../utils/handlePrismaError";
import prisma from "../config/db";

import {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "../../schema/property.schema";

export const getAllProperties = async () => {
  try {
    const properties =await prisma.property.findMany();
    console.log(`properties ${properties}`)
    return properties;
    
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const getPropertyById = async (id: number) => {
  const property = await prisma.property.findUnique({
    where: { id },

    include: {
      NearbyPlaces: true,
      Comments: {
        select: {
          content:true,
          rating:true,
          timestamp:true,
          User: {
            select: {
              username: true,
              createdAt: true,
            },
          },
        },
      },
      rules: true,
      Amenities: true,
      
      User:{
        select:{
          username:true,
          createdAt:true
        }
      }
    },
  });
  if (!property) throw new AppError("Property not found", 404);
  return property;
};

export const addProperty = async (data: any) => {
  const { Amenities, landlordId, ...propertyData } = data;

  return await prisma.property.create({
    data: {
      ...propertyData,
      landlordId, // Use direct foreign key
      ...(Amenities && Amenities.length > 0
        ? {
            Amenities: {
              create: Amenities.map((name: string) => ({ name })),
            },
          }
        : {}),
    },
  });
};
export const deletePropertyById = async (id: number) => {
  try {
    await prisma.property.delete({ where: { id } });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const updateProperty = async (id: number, data: any) => {
  // 1. Pull out landlordId and Amenities so they don't get passed as raw fields
  const { landlordId, Amenities, ...propertyData } = data;

  return await prisma.property.update({
    where: { id: Number(id) },
    data: {
      ...propertyData,
      // 2. Only include Amenities if provided, using nested relation syntax
      ...(Amenities && Array.isArray(Amenities)
        ? {
            Amenities: {
              deleteMany: {}, // clears existing relations for this property
              create: Amenities.map((name: string) => ({ name })),
            },
          }
        : {}),
    },
  });
};
