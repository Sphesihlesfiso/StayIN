import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import { asyncHandler } from "../utils/asyncHandler";
export const getAllComments = async () => {
  return await prisma.comment.findMany();
};
export const deleteComment = async (id: number) => {
  await prisma.comment.delete({ where: { id } });
};
export const addCommnet = async (data: Prisma.CommentCreateInput) => {
  return await prisma.comment.create({ data });
  
};
export const updateComment = async (
  data: Prisma.CommentUpdateInput,
  id: number,
) => {
  return await prisma.comment.update({ where: { id }, data });
  
};
