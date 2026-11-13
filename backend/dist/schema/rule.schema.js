"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRuleSchema = exports.createRuleSchema = void 0;
const zod_1 = require("zod");
exports.createRuleSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "The rule must atleast have one word."),
    propertyId: zod_1.z.int(),
});
exports.updateRuleSchema = exports.createRuleSchema.partial();
