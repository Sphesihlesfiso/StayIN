import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt-ts";
import { error } from "console";
import { generateWebTokens } from "../utils/generateTokens";
//TODO :Proper input validation and error handling and redirection.
//TODO :Proper authorisation and o-auth.
export const signUp = async (data: Prisma.UserCreateInput) => {
  const email = data.email;
  const password = data.password;
  const username = data.username;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw Error("User already exist");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    if (newUser) return "User created successfulley.";
  } catch (error) {
    console.error(error);
    throw Error("Failed to search if user exist or not in db.");
  }
};
export const signIn = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await generateWebTokens(user.id, user.role);

      return { token, user };
    }
    throw error("Invalid credentials.");
  } else {
    throw error("No such user.");
  }
};
export const signOut = async (userId: number) => {
  try {
    
  } catch (error) {
    console.error(error);
    throw Error("Failed to logout user.");
  }
};
