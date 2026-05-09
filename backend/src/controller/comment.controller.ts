import { asyncHandler } from "../utils/asyncHandler";
import {
  addComment,
  deleteComment,
  updateComment,
  getAllComments,
} from "../services/comment.service";
import { Request, Response } from "express";
import { successResponse } from "../utils/apiResponce";

export const getAllComents = asyncHandler(
  async (req: Request, res: Response) => {
    const comments = await getAllComments();
    res.status(200).json(successResponse(comments, "Comments fetched"));
  },
);

export const postComment = asyncHandler(async (req: Request, res: Response) => {
  const comment = await addComment(req.body);
  res.status(201).json(successResponse(comment, "Comment created"));
});

export const deleteCommentById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deleteComment(id);
    res.status(204).send();
  },
);

export const updateCommentById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;
    const updatedComment = await updateComment(id, data);
    res.status(200).json(successResponse(updatedComment, "Comment updated"));
  },
);
