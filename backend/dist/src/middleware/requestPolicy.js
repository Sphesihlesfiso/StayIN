"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.requestPolicy = void 0;
exports.authRateLimit = authRateLimit;
const errors_1 = require("../errors/errors");
const requestPolicy = (req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "no-store");
    if (!["GET", "HEAD", "OPTIONS"].includes(req.method) &&
        req.get("origin") !== (process.env.APP_ORIGIN || "http://localhost:3000"))
        return next(new errors_1.AppError("Request origin is not allowed.", 403));
    next();
};
exports.requestPolicy = requestPolicy;
/** A per-app store preserves the existing single-process development limit. */
function authRateLimit() {
    const attempts = new Map();
    return (req, _res, next) => {
        var _a;
        if (req.method !== "POST")
            return next();
        const now = Date.now();
        for (const [key, value] of attempts)
            if (value.until < now)
                attempts.delete(key);
        const key = `${req.ip}:${req.path}:${String(((_a = req.body) === null || _a === void 0 ? void 0 : _a.email) || "").toLowerCase()}`;
        const value = attempts.get(key) || { count: 0, until: now + 15 * 60000 };
        value.count++;
        attempts.set(key, value);
        if (value.count > 20)
            return next(new errors_1.AppError("Too many attempts. Please try again in 15 minutes.", 429));
        next();
    };
}
const notFound = (_req, _res, next) => next(new errors_1.AppError("Endpoint not found.", 404));
exports.notFound = notFound;
