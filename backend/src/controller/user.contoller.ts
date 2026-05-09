import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteUser } from "../services/user.service";
import { updateUser } from "../services/user.service";
import { successResponse } from "../utils/apiResponce";
export const deleteUserAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deleteUser(id);
    res.status(204);
  },
);
export const updateUserInfo =asyncHandler(async(req:Request,res:Response)=>{
    const data=req.body
    const id = Number(req.params.id);
    await updateUser(id,data)
    res.status(200).json(successResponse(data,"Updated user info."))
})