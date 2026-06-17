import { Comment } from "@/types/comment";
import {crudOperations} from "@/lib/generalCrudeOperations"

const CommentClient = crudOperations<Comment>("property/:propertyId/comments/")


export const getAllComments = CommentClient.getAll

export const getCommentById = CommentClient.getById
export const createComment = CommentClient.create
export const updateComment = CommentClient.update
export const deleteComment = CommentClient.delete