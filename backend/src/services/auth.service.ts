import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt-ts";
import { error } from "console";
import { generateWebTokens } from "../utils/generateTokens";

export const signUp = async (data: Prisma.UserCreateInput) => {
  //TODO :Proper input validation and error handling and redirection.
  const email = data.email;
  const password = data.password;
  const username =data.username
  const existingUser = await prisma.user.findUnique({ where: { email } });
  
  if (existingUser) throw Error("User already exist");
  const hashedPassword =await bcrypt.hash(password,10)
  const newUser = await prisma.user.create({data:{
    email,
    username,
    password:hashedPassword
  }})
  if (newUser) return "User created successfulley."
  
};
export const signIn = async (email:string,password:string) => {
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (user){
        const isMatch =await bcrypt.compare(password,user.password);
        if (isMatch){
            
        const token =await generateWebTokens(user.id,user.role)
       
        return {token,user}
        }
        throw error("Invalid credentials.")

    }else{
        throw error("No such user.");
    }
    
};
