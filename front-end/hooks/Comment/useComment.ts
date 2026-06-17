import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "@/api/commentEndPoints"
import { Comment } from "@/types/comment"

export const useComment = (id: number) =>
  useQuery({
    queryKey: ["comment", id],
    queryFn: () => getCommentById(id),
  })

export const useComments = () =>
  useQuery({
    queryKey: ["comments"],
    queryFn: getAllComments,
  })

export const useCreateComment = () =>
  useMutation({
    mutationFn: createComment,
  })

export const useUpdateComment = () =>
  useMutation<Comment, Error, { id: number; payload: Comment }>({
    mutationFn: ({ id, payload }) => updateComment(id, payload),
  })

export const useDeleteComment = () =>
  useMutation({
    mutationFn: (id: number) => deleteComment(id),
  })
