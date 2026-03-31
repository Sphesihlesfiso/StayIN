import prisma from "../config/db";
export const getAllProperties = async () => {
  try {
    const properties = await prisma.property.findMany();
    return properties;
  } catch (error) {
    console.error("Error fetching properties", error);
  }
};
export const getPropertyById = async (id: number) => {
  
  try {
    const property = prisma.property.findUnique({ where: { id: id } });
    return property;
  } catch (error) {
    console.error(`Failed to fetch property with id ${id} `, error);
  }
};
