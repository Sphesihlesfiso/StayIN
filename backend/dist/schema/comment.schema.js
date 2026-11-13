"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentSchema = exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Content is required"),
    rating: zod_1.z.number().min(1).max(5),
    commenterId: zod_1.z.number().int().positive(),
    propertyId: zod_1.z.number().int().positive(),
});
exports.updateCommentSchema = exports.createCommentSchema.partial();
