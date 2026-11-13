import { z } from "zod";
export const createCommentSchema = z.object({
  content: z.string().min(1, "Content is required"),
  rating: z.number().min(1).max(5),
  commenterId: z.number().int().positive(),
  propertyId: z.number().int().positive(),
});
export const updateCommentSchema = createCommentSchema.partial();
export type CreateCommentInput=z.infer<typeof createCommentSchema>
export type UpdateCommentInput=z.infer<typeof updateCommentSchema>