import {
  deleteCommentById,
  postComment,
  updateCommentById,
} from "./../controller/comment.controller";
import { Router } from "express";
import { getAllComents } from "../controller/comment.controller";

const router = Router();
router.get("/", getAllComents);
router.post("/", postComment);
router.delete("/:id", deleteCommentById);
router.patch("/:id", updateCommentById);
export default router;
