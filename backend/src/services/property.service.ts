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
export const addProperty = async (data: any) => {
  console.log("SERVICE RECEIVED:", JSON.stringify(data, null, 2));
  return await prisma.property.create({
    data: {
      name: data.name,
      address: data.address,
      town: data.town,
      surburb: data.surburb,
      propertyType: data.propertyType,
      genderRestriction: data.genderRestriction,
      rent: data.rent,
      deposit: data.deposit,
      nsfasAccredited: data.nsfasAccredited,

      gas: data.gas,
      water: data.water,
      electricity: data.electricity,
      about: data.about,
      rules: data.rules,
      landlordId: data.landlordId,
    },
  });
};
