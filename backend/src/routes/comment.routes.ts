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
router.post("/post", postComment);
router.delete("/delete/:id",protect, deleteCommentById);
router.patch("/update/:id", updateCommentById);
export default router;
