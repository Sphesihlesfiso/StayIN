import { Prisma } from "@prisma/client";
import prisma from "../config/db";

import { AppError } from "../errors/errors";

export const getAllComments = async () => {
  return await prisma.comment.findMany();
};

export const deleteComment = async (id: number) => {
  try {
    console.log(id);
    return await prisma.comment.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new AppError("Comment not found", 404);
  }
};

export const addComment = async (data: Prisma.CommentCreateInput) => {
  try {
    return await prisma.comment.create({ data });
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to create comment", 400);
  }
};

export const updateComment = async (
  data: Prisma.CommentUpdateInput,
  id: number,
) => {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data,
    });

    return updatedComment;
  } catch (error) {
    console.log(error);
    throw new AppError("Comment to update not found", 404);
  }
};
