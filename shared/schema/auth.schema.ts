import {z} from "zod"


// strict — everything required for registration
export const createUserSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["LANDLORD", "TENANT"]).default("TENANT"),
});

// for login — only email and password needed
export const loginUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});



// for forgot password — only email needed
export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

// for reset password — only new password needed
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
