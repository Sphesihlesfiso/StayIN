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
exports.updateCommentById = exports.deleteCommentById = exports.postComment = exports.getAllComents = void 0;
const comment_schema_1 = require("../../schema/comment.schema");
const asyncHandler_1 = require("../utils/asyncHandler");
const comment_service_1 = require("../services/comment.service");
const apiResponce_1 = require("../utils/apiResponce");
const apiResponce_2 = require("../utils/apiResponce");
exports.getAllComents = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = Number(req.params.propertyId);
    const comments = yield (0, comment_service_1.getAllComments)(propertyId);
    res.status(200).json((0, apiResponce_1.successResponse)(comments, "Comments fetched"));
}));
exports.postComment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = comment_schema_1.createCommentSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_2.validationError)(parsed.error.issues));
    }
    const comment = yield (0, comment_service_1.addComment)(parsed.data);
    res.status(201).json((0, apiResponce_1.successResponse)(comment, "Comment created"));
}));
exports.deleteCommentById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    yield (0, comment_service_1.deleteComment)(id);
    res.status(204).send();
}));
exports.updateCommentById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const parsed = comment_schema_1.updateCommentSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_2.validationError)(parsed.error.issues));
    }
    const updatedComment = yield (0, comment_service_1.updateComment)(id, parsed.data);
    res.status(200).json((0, apiResponce_1.successResponse)(updatedComment, "Comment updated"));
}));
