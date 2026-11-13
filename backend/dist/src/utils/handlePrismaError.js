"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrismaError = mapPrismaError;
exports.handlePrismaError = handlePrismaError;
const client_1 = require("@prisma/client");
const errors_1 = require("../errors/errors");
/** Convert known database failures without exposing database details to clients. */
function mapPrismaError(error) {
    var _a;
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                if (!String(((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) || "").includes("email"))
                    return new errors_1.AppError("This record already exists.", 409);
                return new errors_1.AppError("An account with that email already exists.", 409, {
                    email: [
                        "An account with this email already exists. Sign in or use another email.",
                    ],
                });
            case "P2025":
                return new errors_1.AppError("The requested record could not be found.", 404);
            case "P2003":
                return new errors_1.AppError("This record is linked to other information and cannot be changed yet.", 409);
        }
    }
}
// Existing services can keep using the throwing helper; the middleware owns response formatting.
function handlePrismaError(error) {
    throw mapPrismaError(error) || error;
}
