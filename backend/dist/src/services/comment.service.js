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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.addComment = exports.deleteComment = exports.getAllComments = void 0;
const db_1 = __importDefault(require("../config/db"));
const handlePrismaError_1 = require("../utils/handlePrismaError");
const getAllComments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.comment.findMany({
            where: { propertyId: id },
            include: {
                content: true,
                rating: true,
                timestamp: true,
                User: {
                    select: {
                        username: true,
                    },
                },
            },
        });
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.getAllComments = getAllComments;
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.comment.delete({ where: { id } });
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.deleteComment = deleteComment;
const addComment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.comment.create({
            data: {
                content: data.content,
                rating: data.rating,
                User: { connect: { id: data.commenterId } },
                Property: { connect: { id: data.propertyId } },
            },
        });
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.addComment = addComment;
const updateComment = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedComment = yield db_1.default.comment.update({
            where: { id },
            data,
        });
        return updatedComment;
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.updateComment = updateComment;
