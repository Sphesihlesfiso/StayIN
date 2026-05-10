import { signIn, signUp } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { createUserSchema } from "../../schema/user.schema";
import { loginUserSchema } from "../../schema/auth.schema";

import { successResponse, validationError } from "../utils/apiResponce";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }
    await signUp(parsed.data);
    res.status(201).json(successResponse(null));
  },
);
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(validationError(parsed.error.issues));
  }

  await signIn(parsed.data);
  res.json(successResponse(null, "Loged-in user."));
});
