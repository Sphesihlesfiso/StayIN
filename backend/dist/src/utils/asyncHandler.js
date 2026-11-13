"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
// Controllers and async middleware share the same error path.
const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve()
        .then(() => handler(req, res, next))
        .catch(next);
};
exports.asyncHandler = asyncHandler;
