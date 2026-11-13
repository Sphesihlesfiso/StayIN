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
exports.updatePassword = exports.updateUserInfo = void 0;
const user_schema_1 = require("../../schema/user.schema");
const user_service_1 = require("../services/user.service");
const session_service_1 = require("../services/session.service");
const protectRoute_1 = require("../middleware/protectRoute");
const sessionCookie_1 = require("../utils/sessionCookie");
const apiResponce_1 = require("../utils/apiResponce");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.updateUserInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.updateUser)((0, protectRoute_1.currentUser)(req).id, user_schema_1.updateUserSchema.parse(req.body));
    res.json((0, apiResponce_1.successResponse)(user, "Your profile has been updated."));
}));
exports.updatePassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, protectRoute_1.currentUser)(req);
    yield (0, user_service_1.changePassword)(user.id, user_schema_1.changePasswordSchema.parse(req.body));
    (0, sessionCookie_1.setSessionCookie)(res, yield (0, session_service_1.createSession)(user.id));
    res.json((0, apiResponce_1.successResponse)(null, "Password changed. Other sessions have been signed out."));
}));
