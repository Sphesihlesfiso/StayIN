import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt-ts";
import { error } from "console";
import { generateWebTokens } from "../utils/generateTokens";
import { handlePrismaError } from "../utils/handlePrismaError";

import { CreateUserInput, LoginUserInput } from "@shared/schema/auth.schema";
import { createUserSchema } from '../../../shared/schema/auth.schema';

//TODO :Proper input validation and error handling and redirection.
//TODO :Proper authorisation and o-auth.
export const signUp = async (data: CreateUserInput) => {
  
    const {email,password}=data;
    const user =await prisma.user.findUnique({where:{email}});
    if (user){
        throw Error("Email already registered.")
    }
    const hashed=await bcrypt.hash(password,10);
    const newUser=await prisma.user.create({
        data:{
        ...data,
        password:hashed
    }}
    )
    return newUser;
  } 
  
export const signIn = async (data:LoginUserInput) => {
    const {email,password}=data;
    const user =await prisma.user.findUnique({where:{email}})
    if (!user){
        throw Error("Invalid credentials.")
    }
    const hashedPassword=user.password;
    if (await bcrypt.compare(password,hashedPassword)){
        const {email,username,role,id}=user;

        return {email,id,username,role};
    }else{
        throw Error("Invalid credentials.")
    }
};

