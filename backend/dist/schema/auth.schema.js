"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = exports.newPassword = void 0;
const zod_1 = require("zod");
// bcrypt accepts at most 72 UTF-8 bytes; reject longer new passwords rather than silently truncating.
exports.newPassword = zod_1.z
    .string()
    .min(10, "Use at least 10 characters for your password.")
    .max(128)
    .refine((value) => Buffer.byteLength(value, "utf8") <= 72, "Use a password of at most 72 UTF-8 bytes.");
const credentials = zod_1.z.object({
    email: zod_1.z
        .email("Enter a valid email address.")
        .max(254)
        .transform((v) => v.toLowerCase()),
    password: exports.newPassword,
});
exports.createUserSchema = credentials.extend({
    username: zod_1.z
        .string()
        .trim()
        .min(2, "Enter at least two characters for your name.")
        .max(80),
    role: zod_1.z.enum(["LANDLORD", "TENANT"]),
    acceptTerms: zod_1.z.literal(true, {
        error: "Accept the terms to create an account.",
    }),
});
exports.loginUserSchema = credentials.extend({
    password: zod_1.z.string().min(1, "Enter your password.").max(128),
});
