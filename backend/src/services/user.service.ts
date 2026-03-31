import prisma from "../config/db";
import { Prisma } from "@prisma/client";
export const createUser = async (   ) => {
    await prisma.user.create({
      data: {
        username: "john_doe",
        email: "john@example.com",
        password: "hashed_password_here",
        role:"LANDLORD"
      },
    });
}