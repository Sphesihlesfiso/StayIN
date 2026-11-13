"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data, message = "Success") => ({
    success: true,
    message,
    data,
});
exports.successResponse = successResponse;
const errorResponse = (message, errors) => (Object.assign({ success: false, message, data: null }, (errors ? { errors } : {})));
exports.errorResponse = errorResponse;
const validationError = (errors) => ({
    success: false,
    message: "Please check your entries and try again.",
    errors,
    data: null,
});
exports.validationError = validationError;
