import { Router } from "express";
import { loginUser, registerUser,logoutUser } from "../controller/auth.controller";
const router =Router();
router.post("/sign-up",registerUser)
router.post("/sign-in",loginUser)
router.post("/sign-out",logoutUser)
export default router;