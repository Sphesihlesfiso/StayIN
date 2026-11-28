import { signIn, signUp } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

import { successResponse, validationError } from "../utils/apiResponce";

import { loginUserSchema } from '@shared/schema/auth.schema';
import { createUserSchema } from '../../../shared/schema/auth.schema';
import { generateWebTokens } from "../utils/generateTokens";





export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }
    const user=await signUp(parsed.data);
    if (user){
        generateWebTokens(user.id,res)
        res.status(201).json(successResponse(user));
    }
        
    
    
  },
);
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(validationError(parsed.error.issues));
  }

  const user=await signIn(parsed.data);
  if (user){
    generateWebTokens(user.id,res)
  res.json(successResponse(user, "Loged-in user."));}
});
export const logoutUser =asyncHandler(async(req:Request,res:Response)=> {
  
    }
)