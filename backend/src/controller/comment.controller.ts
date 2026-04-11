import { asyncHandler } from "../utils/asyncHandler";
import {
  addComment,
  deleteComment,
  updateComment,
  getAllComments,
} from "../services/comment.service";
import { Request, Response } from "express";

export const getAllComents = asyncHandler(
  async (req: Request, res: Response) => {
    const comments = await getAllComments();
    res.status(200).json({ success: true, data: comments });
  },
);
export const postComment = asyncHandler(async (req: Request, res: Response) => {
  const comment = await addComment(req.body);
  res.status(201).json({ success: true, data: comment });
});
export const deleteCommentById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    
    const deletedComment = await deleteComment(id);
    res.send(200).json({ success: true, data: deletedComment });
  },
);
export const updateCommentById = asyncHandler(
  async (req: Request, res: Response) => {
    const  data  = req.body;
    const updatedComment = await updateComment(data, Number(req.body.id));
    res.status(200).json({ success: true, data: updatedComment });
  },
);
