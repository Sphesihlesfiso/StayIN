import { signIn, signUp } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const newUser = await signUp(data);
    res.json({ newUser: newUser });
  },
);
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const userLogedIn = await signIn(data.email, data.password);
  res.json({ success:true,... userLogedIn });
});
