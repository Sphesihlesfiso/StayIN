import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteUser, getUser } from "../services/user.service";
import { updateUser } from "../services/user.service";
import { successResponse, validationError } from "../utils/apiResponce";

import { updateUserSchema } from "../../schema/user.schema";
export const deleteUserAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deleteUser(id);
    res.status(204).send();
  },
);
export const updateUserInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = updateUserSchema.safeParse(req.body);
    const id = Number(req.params.id);
    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }
    await updateUser(id, parsed.data);
    res.status(200).json(successResponse(parsed, "Updated user info."));
  },
);
export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await getUser(id);
  res.status(200).json(successResponse(user, "User details."));
});
