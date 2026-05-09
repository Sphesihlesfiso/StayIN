import {
  deleteCommentById,
  
  postComment,
  updateCommentById,
} from "./../controller/comment.controller";
import { Router } from "express";
import { getAllComents } from "../controller/comment.controller";
import { protect } from "../middleware/protectRoute";
const router = Router();
router.get("/", getAllComents);
router.post("/", postComment);
router.delete("/:id",protect, deleteCommentById);
router.patch("/:id",protect, updateCommentById);
export default router;
