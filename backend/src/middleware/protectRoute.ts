import jwt  from "jsonwebtoken"

import { createUserSchema } from '../../../shared/schema/auth.schema';
import { NextFunction, Request,Response } from 'express';
import prisma from "../config/db";
import { string } from "zod";

export const protectRoute= async(req:Request &{user:object},res:Response,next:NextFunction)=>{
  try {
    const token = req.cookies.jwt
    if (!token){
      return res.status(401).json({message:"Error unauthorised no valid token."})
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET!)
    if (!decoded){
      return res.status(401).json({message:"Error unauthorised Invalid token."})
    }
    if (typeof decoded==="string" || !('userId' in decoded)) {
    return res.status(401).json({ message: 'Error unauthorised: Invalid token payload.' });
   }
    const userItem =await prisma.user.findUnique({where:{id:decoded.userId}})
    if (!userItem){
      return res.status(404).json({message:"user not found"})
    }
    const {email,username,role,id}=userItem
    const user={email,username,role,id
    }
    req.user=user
    next()
  } catch (error) {
    console.error("Error verifying token.")
  }
}