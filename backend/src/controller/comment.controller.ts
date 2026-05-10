import { safeParse } from "./../../node_modules/zod/src/v4/classic/parse";
import { createCommentSchema,  CreateCommentInput, updateCommentSchema } from '../../schema/comment.schema'
import { asyncHandler } from "../utils/asyncHandler";
import {
  addComment,
  deleteComment,
  updateComment,
  getAllComments,
} from "../services/comment.service";
import { Request, Response } from "express";
import { successResponse } from "../utils/apiResponce";
import { validationError } from "../utils/apiResponce";
export const getAllComents = asyncHandler(
  async (req: Request, res: Response) => {
    const comments = await getAllComments();
    res.status(200).json(successResponse(comments, "Comments fetched"));
  },
);

export const postComment = asyncHandler(async (req: Request, res: Response) => {
  const parsed = createCommentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(validationError(parsed.error.issues));
  }
  const comment = await addComment(parsed.data);
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
    const parsed = updateCommentSchema.safeParse(req.body);
     if (!parsed.success) {
       return res.status(400).json(validationError(parsed.error.issues));
     }
    const updatedComment = await updateComment(id, parsed.data);
    res.status(200).json(successResponse(updatedComment, "Comment updated"));
  },
);
