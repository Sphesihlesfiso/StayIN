import { signIn, signUp } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { createUserSchema } from "../../schema/user.schema";

import { successResponse, validationError } from "../utils/apiResponce";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createUserSchema.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json(validationError(data.error.issues));
    }
    await signUp(data.data);
    res.status(201).json(successResponse(null));
  },
);
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const data = createUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json(validationError(data.error.issues));
  }

  await signIn(data.data);
  res.json(successResponse(null, "Loged-in user."));
});
