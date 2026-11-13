// schema/amenity.schema.ts
import { z } from "zod";

export const createAmenitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  propertyId: z.number().int().positive("Property ID is required"),
});

export const updateAmenitySchema = createAmenitySchema.partial();

export type CreateAmenityInput = z.infer<typeof createAmenitySchema>;
export type UpdateAmenityInput = z.infer<typeof updateAmenitySchema>;
