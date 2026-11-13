"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errors_1 = require("../errors/errors");
const apiResponce_1 = require("../utils/apiResponce");
const handlePrismaError_1 = require("../utils/handlePrismaError");
const errorHandler = (error, _req, res, _next) => {
    var _a;
    if (error instanceof zod_1.ZodError) {
        const fields = {};
        for (const issue of error.issues) {
            const key = issue.path.join(".") || "form";
            ((_a = fields[key]) !== null && _a !== void 0 ? _a : (fields[key] = [])).push(issue.message);
        }
        res.status(400).json((0, apiResponce_1.validationError)(fields));
        return;
    }
    const expected = error instanceof errors_1.AppError ? error : (0, handlePrismaError_1.mapPrismaError)(error);
    if (expected) {
        res
            .status(expected.statusCode)
            .json((0, apiResponce_1.errorResponse)(expected.message, expected.fieldErrors));
        return;
    }
    if (typeof error === "object" &&
        error &&
        "status" in error &&
        error.status === 413) {
        res
            .status(413)
            .json((0, apiResponce_1.errorResponse)("The photos are too large. Use smaller images."));
        return;
    }
    if (error instanceof SyntaxError) {
        res
            .status(400)
            .json((0, apiResponce_1.errorResponse)("Invalid request body. Please try again."));
        return;
    }
    console.error("API request failed:", error instanceof Error ? error.name : "Unknown error");
    res
        .status(500)
        .json((0, apiResponce_1.errorResponse)("Something went wrong. Please try again."));
};
exports.errorHandler = errorHandler;
