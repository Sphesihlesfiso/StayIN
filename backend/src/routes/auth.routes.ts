import { Router } from "express";
import { loginUser, registerUser } from "../controller/auth.controller";
const router =Router();
router.post("/sign-up",registerUser)
router.post("/sign-in",loginUser)
export default router;