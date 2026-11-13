"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roommateProfileSchema = void 0;
const zod_1 = require("zod");
// Stable keys and a schema version let a future matching algorithm interpret answers.
// This API stores living preferences only; no answers are exposed on public listings.
exports.roommateProfileSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1),
    answers: zod_1.z
        .object({
        sleep: zod_1.z.enum(["early", "late", "flexible"]),
        cleaning: zod_1.z.enum(["daily", "weekly", "as-needed"]),
        noise: zod_1.z.enum(["quiet", "balanced", "lively"]),
        guests: zod_1.z.enum(["rarely", "sometimes", "often"]),
        sharing: zod_1.z.enum(["separate", "ask-first", "shared"]),
        homeTime: zod_1.z.enum(["mostly-out", "mixed", "mostly-home"]),
        communication: zod_1.z.enum(["direct", "check-in", "written"]),
        chores: zod_1.z.enum(["rota", "together", "flexible"]),
    })
        .strict(),
})
    .strict();
