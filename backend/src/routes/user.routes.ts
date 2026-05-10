import { Router } from "express";
import {
  deleteUserAccount,
  getUserInfo,
  updateUserInfo,
} from "../controller/user.contoller";

const router = Router();
router.get("/:id", getUserInfo);
router.delete("/:id", deleteUserAccount);
router.patch("/:id", updateUserInfo);
export default router;
