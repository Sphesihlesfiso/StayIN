
import {z} from "zod"
export const createNearbyPlaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  distance: z.number().positive("Distance must be a positive number"),
  nearByPlaceId: z.number().int().positive("Property ID is required"),
});
export const updateNearbyPlaceSchema=createNearbyPlaceSchema.partial();
export type CreateNearByPlaceInput=z.infer<typeof createNearbyPlaceSchema>
export type UpdateNearByPlaceInput=z.infer<typeof updateNearbyPlaceSchema>