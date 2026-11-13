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
exports.getSession = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const auth_schema_1 = require("../../schema/auth.schema");
const auth_service_1 = require("../services/auth.service");
const session_service_1 = require("../services/session.service");
const sessionCookie_1 = require("../utils/sessionCookie");
const apiResponce_1 = require("../utils/apiResponce");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_service_1.signUp)(auth_schema_1.createUserSchema.parse(req.body));
    (0, sessionCookie_1.setSessionCookie)(res, yield (0, session_service_1.createSession)(user.id));
    res.status(201).json((0, apiResponce_1.successResponse)(user, "Your account is ready."));
}));
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_service_1.signIn)(auth_schema_1.loginUserSchema.parse(req.body));
    (0, sessionCookie_1.setSessionCookie)(res, yield (0, session_service_1.createSession)(user.id));
    res.json((0, apiResponce_1.successResponse)(user, "You are signed in."));
}));
exports.logoutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, session_service_1.deleteSession)((0, sessionCookie_1.readSessionCookie)(req));
    (0, sessionCookie_1.clearSessionCookie)(res);
    res.json((0, apiResponce_1.successResponse)(null, "You are signed out."));
}));
exports.getSession = (0, asyncHandler_1.asyncHandler)((req, res) => res.json((0, apiResponce_1.successResponse)(req.user || null, "Account loaded.")));
