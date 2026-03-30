import prisma from "../config/db";
export const getAllProperties = async () => {
  try {
    const properties = await prisma.property.findMany();
    return properties;
  } catch (error) {
    console.error("Error fetching properties", error);
  }
};
