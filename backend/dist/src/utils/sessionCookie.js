"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_COOKIE = void 0;
exports.readSessionCookie = readSessionCookie;
exports.setSessionCookie = setSessionCookie;
exports.clearSessionCookie = clearSessionCookie;
exports.SESSION_COOKIE = "stayin_session";
const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
};
function readSessionCookie(req) {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a[exports.SESSION_COOKIE];
    return typeof token === "string" ? token : undefined;
}
function setSessionCookie(res, session) {
    res.cookie(exports.SESSION_COOKIE, session.token, Object.assign(Object.assign({}, cookieOptions), { expires: session.expiresAt }));
}
function clearSessionCookie(res) {
    res.clearCookie(exports.SESSION_COOKIE, cookieOptions);
}
