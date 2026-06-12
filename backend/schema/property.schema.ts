// schemas/property.schema.ts
import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  rent: z.number().positive("Rent must be a positive number"),
  deposit: z.number().int().optional(),
  nsfasAccredited: z.boolean().default(false),
  gas: z.number().int().optional(),
  water: z.number().int().optional(),
  electricity: z.number().int().optional(),
  about: z.string().min(1, "About is required"),
  rules: z.string().min(1, "Rules are required"),
  landlordId: z.number().int().positive(),
  genderRestriction: z.enum(["Male", "Female", "Mixed"]),
  propertyType: z.enum(["SingleBackroom",
  "SharingBackroom",
  "Apartment",
  "SharingApartment",
  "SingeFlat"
  ,"Flat"]),
  suburb: z.string().min(1, "Suburb is required"),
  town: z.string().min(1, "Town is required"),
});

export const updatePropertySchema = createPropertySchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;

