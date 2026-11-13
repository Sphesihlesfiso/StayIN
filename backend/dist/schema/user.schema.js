"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const auth_schema_1 = require("./auth.schema");
var auth_schema_2 = require("./auth.schema");
Object.defineProperty(exports, "createUserSchema", { enumerable: true, get: function () { return auth_schema_2.createUserSchema; } });
exports.updateUserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(2, "Enter at least two characters for your name.")
        .max(80),
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1).max(128),
    password: auth_schema_1.newPassword,
});
