import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt-ts";
import { error } from "console";
import { generateWebTokens } from "../utils/generateTokens";
import { handlePrismaError } from "../utils/handlePrismaError";
import { CreateUserInput,} from '../../schema/user.schema';
import { LoginUserInput } from "../../schema/auth.schema";

//TODO :Proper input validation and error handling and redirection.
//TODO :Proper authorisation and o-auth.
export const signUp = async (data: CreateUserInput) => {
  const { username,email, password } = data;
  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    
    return newUser;
  } catch (error) {
    handlePrismaError(error)
  }
};
export const signIn = async (data:LoginUserInput) => {
  const {email,password}=data
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
  
    throw Error("Failed to logout user.");
  }
};
