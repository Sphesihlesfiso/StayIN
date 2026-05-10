// schemas/property.schema.ts
import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  rent: z.number().positive("Rent must be a positive number"),
  deposit: z.number().positive().optional(),
  nsfasAccredited: z.boolean().default(false),
  gas: z.number().int().optional(),
  water: z.number().int().optional(),
  electricity: z.number().int().optional(),
  about: z.string().min(1, "About is required"),
  rules: z.string().min(1, "Rules are required"),
  landlordId: z.number().int().positive(),
  genderRestriction: z.enum(["MALE_ONLY", "FEMALE_ONLY", "MIXED"]),
  propertyType: z.enum(["SINGLE", "SHARING"]),
  suburb: z.string().min(1, "Suburb is required"),
  town: z.string().min(1, "Town is required"),
});

export const updatePropertySchema = createPropertySchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
