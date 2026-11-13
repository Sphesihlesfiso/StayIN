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
exports.deleteRule = exports.updateRule = exports.addRule = exports.getRuleById = exports.getAllRules = void 0;
const db_1 = __importDefault(require("../config/db"));
// Fetch all rules for a specific property
const getAllRules = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.rule.findMany({
        where: { propertyId },
    });
});
exports.getAllRules = getAllRules;
// Fetch a single rule by its own ID
const getRuleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.rule.findUnique({
        where: { id },
    });
});
exports.getRuleById = getRuleById;
// Add a new rule to a property
const addRule = (propertyId, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.rule.create({
        data: {
            content,
            propertyId,
        },
    });
});
exports.addRule = addRule;
// Update an existing rule
const updateRule = (id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.rule.update({
        where: { id },
        data: { content },
    });
});
exports.updateRule = updateRule;
// Delete a rule
const deleteRule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.rule.delete({
        where: { id },
    });
});
exports.deleteRule = deleteRule;
