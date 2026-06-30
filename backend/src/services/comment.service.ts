import {
  CreateCommentInput,
  UpdateCommentInput,
} from "../../schema/comment.schema";
import prisma from "../config/db";
import { handlePrismaError } from "../utils/handlePrismaError";

export const getAllComments = async (id: number) => {
  try {
    return await prisma.comment.findMany({
      where: { propertyId: id },
      include: {
        content: true,
        rating: true,
        timestamp: true,

        User:{
          select:{
            username:true

          }
        }
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
};
export const deleteComment = async (id: number) => {
  try {
    await prisma.comment.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
};

export const addComment = async (data: CreateCommentInput) => {
  try {
    return await prisma.comment.create({
      data: {
        content: data.content,
        rating: data.rating,
        User: { connect: { id: data.commenterId } },
        Property: { connect: { id: data.propertyId } },
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
};

export const updateComment = async (id: number, data: UpdateCommentInput) => {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data,
    });

    return updatedComment;
  } catch (error) {
    handlePrismaError(error);
  }
};
