import { createUser } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request,Response } from "express";
export const insertUser= asyncHandler( async (req:Request,res:Response) =>{
    await createUser();
})