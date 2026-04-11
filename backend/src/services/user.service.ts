
import prisma from "../config/db";
import { Prisma } from "@prisma/client";
export const deleteUser = async (data : Prisma.UserCreateInput  ) => {
  const userId =data.
  try {
    await prisma.user.delete({where:{email:userEmial}})
  } catch (error) {
    console.error(error);
    throw Error("Failed to delete user account")
  }
    
}
export const updateUser = async ()
