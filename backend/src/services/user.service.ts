
import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import { AppError } from '../errors/errors';
export const deleteUser = async (data: Prisma.UserCreateInput, id:number) => {
  
  try {
    await prisma.user.delete({ where: { id: id } });
  } catch (error) {
    console.error(error);
    throw Error("Failed to delete user account");
  }
};
export const updateUser = async (data:Prisma.UserUpdateInput,id:number) =>{
  try {
    await prisma.user.update({where:{id:id},data})
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to update user info",500);
    
  }
}
