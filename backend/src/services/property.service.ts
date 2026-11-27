import { Prisma } from "@prisma/client";
import { AppError } from "../errors/errors";
import { handlePrismaError } from "../utils/handlePrismaError";
import prisma from "../config/db";
import { CreatePropertyInput,UpdatePropertyInput } from "@shared/schema/property.schema";
import {GenderRestriction} from "@prisma/client"


/*
 TODO
 Change property schema 
 Change property type to accomodate new schema
 Fix all services + controllers for property

*/
export const getAllProperties = async () => {
  try {
    return await prisma.property.findMany();
  } catch (error) {
    //when console login the error it works but not when handling it.
    throw handlePrismaError(error);
  }
};
export const getAllbyId =async(id:number)=>{
  try {
    return await prisma.property.findMany({where:{landlordId:id}})
  } catch (error) {
    throw handlePrismaError(error);
  }
}
export const getPropertyById = async (id: number) => {
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) throw new AppError("Property not found", 404);
  return property;
};

export const addProperty = async (data: CreatePropertyInput,userId: number,images:string[]) => {
  try {
    const { availableFrom, ...rest } = data;
    return await prisma.property.create({ data:{...rest,images:images,availableFrom:new Date(availableFrom),
      user:{
        connect:
        {id:userId}
  
  }}});
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
  data: UpdatePropertyInput,
  newFiles:Express.Multer.File[], removedImages:string[]
) => {
  
  try {
    return await prisma.property.update({ where: { id }, data:{
     
      ...data,
      availableFrom:new Date(data.availableFrom!),
    } });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
