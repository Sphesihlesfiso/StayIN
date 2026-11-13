import { z } from "zod";

// strict — everything required for registration
export const createUserSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["LANDLORD", "TENANT"]).default("TENANT"),
});



// for update — everything optional
export const updateUserSchema = createUserSchema.partial();



export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
;
