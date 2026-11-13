"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.protect = exports.identify = void 0;
exports.currentUser = currentUser;
const session_service_1 = require("../services/session.service");
const sessionCookie_1 = require("../utils/sessionCookie");
const errors_1 = require("../errors/errors");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.identify = (0, asyncHandler_1.asyncHandler)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.user = (yield (0, session_service_1.getSessionUser)((0, sessionCookie_1.readSessionCookie)(req))) || undefined;
    next();
}));
exports.protect = (0, asyncHandler_1.asyncHandler)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.user = (yield (0, session_service_1.getSessionUser)((0, sessionCookie_1.readSessionCookie)(req))) || undefined;
    if (!req.user)
        throw new errors_1.AppError("Please sign in to continue.", 401);
    next();
}));
function currentUser(req) {
    if (!req.user)
        throw new errors_1.AppError("Please sign in to continue.", 401);
    return req.user;
}
const requireRole = (role) => (req, _res, next) => {
    const user = currentUser(req);
    if (user.role !== role)
        return next(new errors_1.AppError(role === "TENANT"
            ? "The roommate quiz is available to tenant accounts only."
            : "A landlord account is needed to publish listings.", 403));
    next();
};
exports.requireRole = requireRole;
